import {
  Notification,
  PostNotification,
  CommentNotification,
  CommentRepliesNotification,
  FollowNotification,
} from "../models/notificationModel.js";
import {
  sendResponse,
  handleCallback,
  fifteenDaysAgo,
} from "../utils/utils.js";

export const getNotification = handleCallback(async (req, res, next) => {
  const user = req.user;

  const notificationFresh = await Notification.find({
    notificationFor: user._id,
    isViewed: false,
  })
    .populate({ path: "notificationBy", select: "_id name image userName" })
    .sort({ createdAt: -1 })
    .exec();
  const notificationOld = await Notification.find({
    notificationFor: user._id,
    isViewed: true,
  })
    .populate({ path: "notificationBy", select: "_id name image userName" })
    .sort({ createdAt: -1 })
    .exec();

  sendResponse({
    message: "User notification fetched successfully",
    status: true,
    code: 200,
    data: {
      fresh: notificationFresh,
      viewed: notificationOld,
    },
    res,
  });
});

export const updateNotification = handleCallback(async (req, res, next) => {
  const user = req.user;

  const { notificationIds } = req.body;

  await Notification.updateMany(
    {
      _id: { $in: notificationIds },
      notificationFor: user._id,
    },
    {
      $set: { isViewed: true },
    }
  );

  sendResponse({
    message: "User notification updated successfully",
    status: true,
    code: 200,
    res,
  });
});

export const createNotification = async ({ type, params }) => {
  const currentDate = new Date();
  try {
    if (type === "post") {
      const newPostNotification = await PostNotification.create({ ...params });
      return newPostNotification;
    }
    if (type === "comment") {
      const newCommentNotification = await CommentNotification.create({
        ...params,
      });
      return newCommentNotification;
    }
    if (type === "commentReplies") {
      const newCommentRepliesNotification =
        await CommentRepliesNotification.create({ ...params });
      return newCommentRepliesNotification;
    }

    if (type === "follow") {
      const isAlreadyFollowed = await FollowNotification.findOne({
        notificationFor: params.notificationFor,
        createdAt: {
          $gte: fifteenDaysAgo,
          $lt: currentDate,
        },
        notificationType: "user",
      });
      if (!isAlreadyFollowed) {
        const newFollowNotification = await FollowNotification.create({
          ...params,
        });
        return newFollowNotification;
      }
    }
  } catch (error) {
    console.log(error);
    throw error.message || "Failed to add notification";
  }
};
