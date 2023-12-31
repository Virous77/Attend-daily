import {
  uploadImage,
  deleteImages,
  uploadVideos,
} from "../utils/imageUpload.js";
import { createError, handleCallback, sendResponse } from "../utils/utils.js";
import postModel from "../models/postModel.js";
import commentModel from "../models/commentModel.js";
import commentReplies from "../models/commentReplies.js";
import postLikeModel from "../models/postLikeModel.js";
import { IncomingForm } from "formidable";
import pollModel from "../models/pollModel.js";
import { createNotification } from "./notificationController.js";

/// Utility Function
export const toggleLikeInComment = async ({
  model,
  commentId,
  userId,
  active,
}) => {
  try {
    let comment;

    if (active === "true") {
      comment = await model.findOne({ postId: commentId });
    } else if (active === "yes") {
      comment = await model.findOne({ userId });
    } else {
      comment = await model.findOne({ _id: commentId });
    }

    if (!comment) {
      throw new Error("Comment not found");
    }

    let likeIndex;

    if (active === "yes") {
      likeIndex = comment.bookMarks.indexOf(commentId);

      if (likeIndex !== -1) {
        comment.bookMarks.splice(likeIndex, 1);
      } else {
        comment.bookMarks.push(commentId);
      }
    } else {
      likeIndex = comment.like.indexOf(userId);

      if (likeIndex !== -1) {
        comment.like.splice(likeIndex, 1);
      } else {
        comment.like.push(userId);
        if (active === "true") {
          const post = await postModel.findById(commentId);
          createNotification({
            type: "post",
            params: {
              notificationBy: userId.toString(),
              notificationFor: post.userId.toString(),
              message: "liked your post",
              notificationType: "post",
              notificationRef: commentId,
              notificationEvent: "like",
            },
          });
        }
      }
    }

    const updatedComment = await comment.save();
    return updatedComment;
  } catch (error) {
    throw error;
  }
};

export const createPost = handleCallback(async (req, res) => {
  const user = req.user;
  const packet = {
    userId: user._id,
    ...req.body,
  };

  if (req.body.pin === true) {
    await postModel.findOneAndUpdate(
      { userId: user._id, pin: true },
      {
        pin: false,
      }
    );
  }

  const newPost = new postModel(packet);
  await newPost.save();
  const postLike = new postLikeModel({ postId: newPost._id });
  await postLike.save();
  await postModel.findByIdAndUpdate(newPost._id, { like: postLike._id });

  sendResponse({
    status: true,
    code: 201,
    message: "Post created Successfully",
    data: newPost,
    res,
  });
});

export const updatePost = handleCallback(async (req, res, next) => {
  const user = req.user;
  const { id, deleteFiles, ...rest } = req.body;

  const isUserPost = await postModel.findById(id);
  if (!isUserPost.userId.equals(user._id))
    return next(
      createError({
        message: "You are not authorized for this action",
        status: 400,
      })
    );

  const packet = {
    userId: user._id,
    ...rest,
  };

  await postModel.findByIdAndUpdate(id, packet);
  if (deleteFiles.length > 0) {
    await deleteImages(deleteFiles);
  }

  sendResponse({
    status: true,
    code: 200,
    message: "Post updated Successfully",
    res,
  });
});

export const deletePost = handleCallback(async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;

  const isUserPost = await postModel.findById(id);
  if (!isUserPost.userId.equals(user._id))
    return next(
      createError({
        message: "You are not authorized for this action",
        status: 400,
      })
    );

  const files = [...isUserPost.image, ...isUserPost.video];

  if (files.length > 0) {
    await deleteImages(files);
  }

  await postModel.findByIdAndDelete(id);
  await commentModel.deleteMany({ postId: id });
  await commentReplies.deleteMany({ postId: id });
  await pollModel.deleteOne({ postId: id });
  await postLikeModel.deleteOne({ postId: id });

  sendResponse({
    status: true,
    code: 200,
    message: "Post deleted Successfully",
    res,
  });
});

export const addPostLike = handleCallback(async (req, res) => {
  const likeUser = req.user;
  const { postId } = req.body;

  const newLike = await toggleLikeInComment({
    model: postLikeModel,
    userId: likeUser._id,
    commentId: postId,
    active: "true",
  });

  sendResponse({
    status: true,
    code: 200,
    message: "You have Liked comment Successfully",
    data: newLike,
    res,
  });
});

const executePostQuery = async (
  query,
  type = true,
  pageNumber = 1,
  pageSize = 10
) => {
  const skipDocuments = (+pageNumber - 1) * +pageSize;
  const queryModel = type
    ? postModel.find(query).skip(skipDocuments).limit(+pageSize)
    : postModel.findById(query);
  const posts = await queryModel
    .populate({
      path: "like",
      select: "_id postId like",
    })
    .populate({
      path: "retweetUser",
      select: "_id postId users",
    })
    .populate({
      path: "userId",
      select: "image name userName",
    })
    .populate({
      path: "quotePostId",
      select:
        "_id title image video pin postType totalComments location isDeleted originalPost isRetweeted createdAt updatedAt retweetUser",
      populate: [
        {
          path: "userId",
          select: "image name userName",
        },
        {
          path: "poll",
          select: "_id choice vote expiryDate voters postId",
        },
        {
          path: "like",
          select: "_id postId like",
        },
      ],
    })
    .populate({
      path: "poll",
      select: "_id choice vote expiryDate voters postId",
    })
    .populate({
      path: "originalPost",
      select: "_id totalComments",
      populate: [
        {
          path: "userId",
          select: "image name userName",
        },
        {
          path: "retweetUser",
          select: "_id postId users",
        },
      ],
    })
    .sort({ createdAt: -1 })
    .exec();

  return posts;
};

export const getSinglePost = handleCallback(async (req, res, next) => {
  const { id } = req.params;
  const post = await executePostQuery(id, false);

  if (!post)
    return next(createError({ status: 400, message: "Post not found" }));

  sendResponse({
    status: true,
    code: 200,
    message: "Post fetched Successfully",
    data: post,
    res,
  });
});

export const getUserPosts = handleCallback(async (req, res, next) => {
  const { id } = req.params;
  const { pageNumber, pageSize } = req.query;

  const posts = await executePostQuery(
    { userId: id, pin: false },
    true,
    pageNumber,
    pageSize
  );

  sendResponse({
    status: true,
    code: 200,
    message: "User Posts fetched Successfully",
    data: posts,
    res,
  });
});

export const getUserPostsByType = handleCallback(async (req, res, next) => {
  const { id, type } = req.params;
  const { pageNumber, pageSize } = req.query;

  const posts = await executePostQuery(
    { userId: id, postType: type },
    true,
    pageNumber,
    pageSize
  );

  sendResponse({
    status: true,
    code: 200,
    message: "User Posts fetched Successfully",
    data: posts,
    res,
  });
});

export const getPosts = handleCallback(async (req, res) => {
  const { pageNumber, pageSize, type } = req.query;
  const query = type === "home feed" ? {} : { postType: type.slice(0, -1) };
  const posts = await executePostQuery(query, true, pageNumber, pageSize);

  sendResponse({
    status: true,
    code: 200,
    message: "Posts fetched Successfully",
    data: posts,
    res,
  });
});

export const uploadFiles = handleCallback(async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const fileValue = Object.values(data.files);

  const sortFile = () => {
    const video = [];
    const image = [];
    fileValue.map((file) => {
      if (file[0].mimetype.includes("video")) {
        video.push(file[0].filepath);
      } else {
        image.push(file[0].filepath);
      }
    });
    return { image, video };
  };

  const imageRef = await uploadImage(sortFile().image);
  const videoRef = await uploadVideos(sortFile().video);

  const image = imageRef.map((img) => img.secure_url);
  const video = videoRef.map((vdo) => vdo.secure_url);
  sendResponse({
    status: true,
    code: 200,
    message: "Files uploaded Successfully",
    data: { image, video },
    res,
  });
});

export const addVote = handleCallback(async (req, res, next) => {
  const user = req.user;
  const { index, id } = req.body;

  const vote = await pollModel.findById(id);
  const ifVoted = vote.voters.includes(user._id);

  if (ifVoted)
    return next(
      createError({ message: "You have already voted ", status: 400 })
    );

  createNotification({
    type: "post",
    params: {
      notificationBy: user._id.toString(),
      notificationFor: vote.userId.toString(),
      message: "added poll on your post",
      notificationType: "post",
      notificationRef: vote.postId,
      notificationEvent: "poll",
    },
  });

  await pollModel.updateOne(
    { _id: id },
    {
      $inc: { [`vote.${index}`]: 1 },
      $addToSet: { voters: user._id },
    },
    { arrayFilters: [{ index: index }] }
  );

  sendResponse({
    status: true,
    code: 200,
    message: "Votes added Successfully",
    res,
  });
});

export const userPinPost = handleCallback(async (req, res) => {
  const id = req.user._id;

  const isUserPost = await executePostQuery(
    { userId: id, pin: true },
    true,
    1,
    1
  );

  sendResponse({
    status: true,
    code: 200,
    message: "Post pinned Successfully",
    res,
    data: isUserPost,
  });
});

export const toggleUserPinPost = handleCallback(async (req, res) => {
  const { type, postId } = req.query;

  if (type === "false") {
    await postModel.findOneAndUpdate(
      { userId: req.user._id, pin: true },
      {
        pin: false,
      }
    );
  }

  const updatedPost = await postModel.findOneAndUpdate(
    { userId: req.user._id, _id: postId },
    { $set: { pin: type === "true" ? false : true } },
    { new: true }
  );

  if (!updatedPost) {
    throw new Error("You are not authorized for this action");
  }

  sendResponse({
    status: true,
    code: 200,
    message: `Post ${type === "true" ? "Unpinned" : "Pinned"} Successfully`,
    res,
  });
});

export const getExplorePosts = handleCallback(async (req, res) => {
  const { pageNumber, pageSize } = req.query;

  const skipDocuments = (+pageNumber - 1) * +pageSize;
  const posts = await postModel.aggregate([
    {
      $match: {
        image: { $exists: true, $ne: [] },
      },
    },
    {
      $project: {
        _id: 1,
        image: { $arrayElemAt: ["$image", 0] },
      },
    },
    {
      $skip: skipDocuments,
    },
    {
      $limit: +pageSize,
    },
  ]);

  sendResponse({
    status: true,
    code: 200,
    message: "Posts fetched Successfully",
    data: posts,
    res,
  });
});
