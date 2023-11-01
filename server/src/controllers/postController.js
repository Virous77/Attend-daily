import { uploadImage, deleteImages } from "../utils/imageUpload.js";
import { createError, handleCallback, sendResponse } from "../utils/utils.js";
import postModel from "../models/postModel.js";
import commentModel from "../models/commentModel.js";
import commentReplies from "../models/commentReplies.js";
import postLikeModel from "../models/postLikeModel.js";

/// Utility Function
const toggleLikeInComment = async ({ model, commentId, userId, active }) => {
  try {
    let comment;

    if (active) {
      comment = await model.findOne({ postId: commentId });
    } else {
      comment = await model.findOne({ _id: commentId });
    }

    if (!comment) {
      throw new Error("Comment not found");
    }

    const likeIndex = comment.like.indexOf(userId);

    if (likeIndex !== -1) {
      comment.like.splice(likeIndex, 1);
    } else {
      comment.like.push(userId);
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
    title: req.body.title,
    postType: req.body.type,
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
  const { content, commentId } = req.body;

  const packet = {
    commentedUser: commentReplyUser._id,
    content,
    commentId,
  };

  const newComment = new commentReplies(packet);
  await newComment.save();

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
  const { type, commentId } = req.body;

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
    active: true,
  });

  sendResponse({
    status: true,
    code: 200,
    message: "You have Liked comment Successfully",
    data: newLike,
    res,
  });
});

export const getUserPosts = handleCallback(async (req, res, next) => {
  const user = req.user;

  const posts = await postModel
    .find({ userId: user._id })
    .populate("like")
    .exec();

  console.log(posts);

  sendResponse({
    status: true,
    code: 200,
    message: "User Posts fetched Successfully",
    data: posts,
    res,
  });
});
