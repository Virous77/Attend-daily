import commentModel from "../models/commentModel.js";
import commentReplies from "../models/commentReplies.js";
import postModel from "../models/postModel.js";
import { createError, handleCallback, sendResponse } from "../utils/utils.js";
import { createNotification } from "./notificationController.js";
import { toggleLikeInComment } from "./postController.js";

const commonNotification = async (commentReplyUser, comment, newComment) => {
  await createNotification({
    type: "commentReplies",
    params: {
      notificationBy: commentReplyUser._id.toString(),
      notificationFor: comment.commentedUser.toString(),
      message: "commented on your comment.",
      notificationType: "commentReplies",
      notificationEvent: "commentReplies",
      notificationRef: newComment._id,
    },
  });
};

const commonErrorValidate = ({ userId, compareId, next }) => {
  if (!compareId.equals(userId)) {
    return next(
      createError({
        message: "You are not authorized for this action",
        status: 400,
      })
    );
  }
};

export const deleteComment = handleCallback(async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;

  let isUserComment;
  if (req.query.type === "parent") {
    isUserComment = await commentModel.findById(id);
  } else {
    isUserComment = await commentReplies.findById(id);
  }

  commonErrorValidate({
    userId: user._id,
    compareId: isUserComment.commentedUser,
    next,
  });

  if (req.query.type === "parent") {
    await commentModel.findByIdAndDelete(id);
  } else {
    await commentReplies.findByIdAndDelete(id);
    await commentModel.findByIdAndUpdate(isUserComment.commentId, {
      $inc: { totalComments: -1 },
    });
    await commentReplies.findByIdAndUpdate(isUserComment.commentId, {
      $inc: { totalComments: -1 },
    });
  }

  await postModel.findByIdAndUpdate(isUserComment.postId, {
    $inc: { totalComments: -1 },
  });

  sendResponse({
    status: true,
    code: 200,
    message: "Comment deleted Successfully",
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
  const post = await postModel.findByIdAndUpdate(postId, {
    $inc: { totalComments: 1 },
  });

  createNotification({
    type: "comment",
    params: {
      notificationBy: commentedUser._id.toString(),
      notificationFor: post.userId.toString(),
      message: "commented on your post.",
      notificationType: "comment",
      notificationEvent: "comment",
      notificationRef: newComment._id,
    },
  });

  sendResponse({
    status: true,
    code: 201,
    message: "Comment added Successfully",
    data: newComment,
    res,
  });
});

export const updateComment = handleCallback(async (req, res, next) => {
  const user = req.user;
  const { content, commentId, type } = req.body;

  if (type === "parent") {
    const comment = await commentModel.findById(commentId);
    commonErrorValidate({
      userId: user._id,
      compareId: comment.commentedUser,
      next,
    });

    await commentModel.findByIdAndUpdate(commentId, { content });
  } else {
    const comment = await commentReplies.findById(commentId);
    commonErrorValidate({
      userId: user._id,
      compareId: comment.commentedUser,
      next,
    });

    await commentReplies.findByIdAndUpdate(commentId, { content });
  }

  sendResponse({
    status: true,
    code: 201,
    message: "Comment updated Successfully",
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
    const comment = await commentModel.findByIdAndUpdate(commentId, {
      $inc: { totalComments: 1 },
    });

    commonNotification(commentReplyUser, comment, newComment);
  } else {
    const comment = await commentReplies.findByIdAndUpdate(commentId, {
      $inc: { totalComments: 1 },
    });
    commonNotification(commentReplyUser, comment, newComment);
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

    const comment = await commentModel.findById(commentId);

    createNotification({
      type: "comment",
      params: {
        notificationBy: likeUser._id.toString(),
        notificationFor: comment.commentedUser.toString(),
        message: "liked your comment",
        notificationType: "comment",
        notificationRef: commentId,
        notificationEvent: "like",
      },
    });
  } else {
    newLike = await toggleLikeInComment({
      model: commentReplies,
      userId: likeUser._id,
      commentId,
    });
    const comment = await commentReplies.findById(commentId);
    createNotification({
      type: "commentReplies",
      params: {
        notificationBy: likeUser._id.toString(),
        notificationFor: comment.commentedUser.toString(),
        message: "liked your comment",
        notificationType: "commentReplies",
        notificationRef: commentId,
        notificationEvent: "like",
      },
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

export const getComments = handleCallback(async (req, res) => {
  const { postId } = req.params;
  const { pageNumber, pageSize } = req.query;

  const skipDocuments = (+pageNumber - 1) * +pageSize;

  const comments = await commentModel
    .find({ postId: postId })
    .populate({
      path: "commentedUser",
      select: "image name userName",
    })
    .skip(skipDocuments)
    .limit(+pageSize)
    .sort({ createdAt: -1 });

  sendResponse({
    status: true,
    code: 200,
    message: "Post comments fetched Successfully",
    data: comments,
    res,
  });
});

export const getSingleComment = handleCallback(async (req, res, next) => {
  const { id, type } = req.params;
  const { pageNumber, pageSize } = req.query;

  const skipDocuments = (+pageNumber - 1) * +pageSize;

  let comment;
  let commentChild;

  if (type === "parent") {
    comment = await commentModel.findById(id).populate({
      path: "commentedUser",
      select: "image name userName",
    });
    if (comment) {
      commentChild = await commentReplies
        .find({ commentId: comment._id })
        .populate({
          path: "commentedUser",
          select: "image name userName",
        })
        .skip(skipDocuments)
        .limit(+pageSize)
        .sort({ createdAt: -1 });
    }
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
      .skip(skipDocuments)
      .limit(+pageSize)
      .sort({ createdAt: -1 });
  }

  if (!comment)
    return next(createError({ status: 400, message: "Post not found" }));

  sendResponse({
    status: true,
    code: 200,
    message: "Comments fetched Successfully",
    data: { comment, commentChild },
    res,
  });
});
