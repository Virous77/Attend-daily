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
  const { title, postType, location, image, video } = req.body;
  const packet = {
    userId: user._id,
    title,
    postType,
    location,
    image,
    video,
  };

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

export const createPoll = handleCallback(async (req, res) => {
  const user = req.user;
  const { title, postType, location, image, video, choice, expiryDate } =
    req.body;
  const packet = {
    userId: user._id,
    title,
    postType,
    location,
    image,
    video,
  };

  const newPost = new postModel(packet);
  await newPost.save();

  const pollPacket = {
    choice,
    expiryDate,
    userId: user._id,
    postId: newPost._id,
    vote: choice.map((value) => 0),
  };

  const newPoll = new pollModel(pollPacket);
  await newPoll.save();

  const postLike = new postLikeModel({ postId: newPost._id });
  await postLike.save();
  await postModel.findByIdAndUpdate(newPost._id, {
    like: postLike._id,
    poll: newPoll._id,
  });

  sendResponse({
    status: true,
    code: 201,
    message: "Poll created Successfully",
    data: newPost,
    res,
  });
});

export const updatePost = handleCallback(async (req, res, next) => {
  const user = req.user;
  const { title, postType, location, image, video, id, deleteFiles } = req.body;

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
    title,
    postType,
    location,
    image,
    video,
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

export const updatePoll = handleCallback(async (req, res, next) => {
  const user = req.user;
  const {
    title,
    postType,
    location,
    image,
    video,
    id,
    deleteFiles,
    choice,
    expiryDate,
  } = req.body;

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
    title,
    postType,
    location,
    image,
    video,
  };

  const pollPacket = {
    choice,
    expiryDate,
  };

  await postModel.findByIdAndUpdate(id, packet);
  await pollModel.findByIdAndUpdate(isUserPost.poll, pollPacket);
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

  sendResponse({
    status: true,
    code: 200,
    message: "Post deleted Successfully",
    res,
  });
});

export const addComment = handleCallback(async (req, res) => {
  const commentedUser = req.user;
  const { content, postId } = req.body;

  const packet = {
    commentedUser: commentedUser._id,
    content,
    postId,
  };
  const newComment = new commentModel(packet);
  await newComment.save();
  await postModel.findByIdAndUpdate(postId, {
    $inc: { totalComments: 1 },
  });

  sendResponse({
    status: true,
    code: 201,
    message: "Comment added Successfully",
    data: newComment,
    res,
  });
});

export const addCommentReplies = handleCallback(async (req, res) => {
  const commentReplyUser = req.user;
  const { content, postId, commentId, type } = req.body;

  const packet = {
    commentedUser: commentReplyUser._id,
    content,
    commentId,
    postId,
  };

  const newComment = new commentReplies(packet);
  await newComment.save();
  await postModel.findByIdAndUpdate(postId, {
    $inc: { totalComments: 1 },
  });
  if (type === "parent") {
    await commentModel.findByIdAndUpdate(commentId, {
      $inc: { totalComments: 1 },
    });
  } else {
    await commentReplies.findByIdAndUpdate(commentId, {
      $inc: { totalComments: 1 },
    });
  }

  sendResponse({
    status: true,
    code: 201,
    message: "Comment added Successfully",
    data: newComment,
    res,
  });
});

export const addCommentLike = handleCallback(async (req, res) => {
  const likeUser = req.user;
  const { type, postId: commentId } = req.body;

  let newLike;

  if (type === "parent") {
    newLike = await toggleLikeInComment({
      model: commentModel,
      userId: likeUser._id,
      commentId,
    });
  } else {
    newLike = await toggleLikeInComment({
      model: commentReplies,
      userId: likeUser._id,
      commentId,
    });
  }

  sendResponse({
    status: true,
    code: 200,
    message: "You have Liked comment Successfully",
    data: newLike,
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

export const getSinglePost = handleCallback(async (req, res, next) => {
  const { id } = req.params;
  const post = await postModel
    .findById(id)
    .populate({
      path: "like",
      select: "_id postId like",
    })
    .populate({
      path: "userId",
      select: "image name userName",
    })
    .populate({
      path: "poll",
      select: "_id choice vote expiryDate expiryTime voters",
    })
    .exec();

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

export const getSingleComment = handleCallback(async (req, res) => {
  const { id, type } = req.params;

  let comment;
  let commentChild;

  if (type === "parent") {
    comment = await commentModel.findById(id).populate({
      path: "commentedUser",
      select: "image name userName",
    });
    commentChild = await commentReplies
      .find({ commentId: comment._id })
      .populate({
        path: "commentedUser",
        select: "image name userName",
      })
      .sort({ createdAt: -1 });
  } else {
    comment = await commentReplies.findById(id).populate({
      path: "commentedUser",
      select: "image name userName",
    });
    commentChild = await commentReplies
      .find({ commentId: comment._id })
      .populate({
        path: "commentedUser",
        select: "image name userName",
      })
      .sort({ createdAt: -1 });
  }

  if (!comment)
    return next(createError({ status: 400, message: "Comment not found" }));

  sendResponse({
    status: true,
    code: 200,
    message: "Comments fetched Successfully",
    data: { comment, commentChild },
    res,
  });
});

export const getUserPosts = handleCallback(async (req, res, next) => {
  const { id } = req.params;

  const posts = await postModel
    .find({ userId: id })
    .populate({
      path: "like",
      select: "_id postId like",
    })
    .populate({
      path: "userId",
      select: "image name userName",
    })
    .populate({
      path: "poll",
      select: "_id choice vote expiryDate expiryTime voters",
    })
    .sort({ createdAt: -1 })
    .exec();

  sendResponse({
    status: true,
    code: 200,
    message: "User Posts fetched Successfully",
    data: posts,
    res,
  });
});

export const getPosts = handleCallback(async (req, res) => {
  const posts = await postModel
    .find()
    .populate({
      path: "like",
      select: "_id postId like",
    })
    .populate({
      path: "userId",
      select: "image name userName",
    })
    .populate({
      path: "poll",
      select: "_id choice vote expiryDate expiryTime voters",
    })
    .sort({ createdAt: -1 })
    .exec();

  sendResponse({
    status: true,
    code: 200,
    message: "Posts fetched Successfully",
    data: posts,
    res,
  });
});

export const getComments = handleCallback(async (req, res) => {
  const { postId } = req.params;

  const comments = await commentModel
    .find({ postId: postId })
    .populate({
      path: "commentedUser",
      select: "image name userName",
    })
    .sort({ createdAt: -1 });

  sendResponse({
    status: true,
    code: 200,
    message: "Post comments fetched Successfully",
    data: comments,
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

  await pollModel.updateOne(
    { _id: id },
    {
      $inc: { [`vote.${index}`]: 1 },
      $addToSet: { voters: user._id },
    },
    { arrayFilters: [{ index: index }] }
  );

  console.log(vote);
  sendResponse({
    status: true,
    code: 200,
    message: "Votes added Successfully",
    res,
  });
});
