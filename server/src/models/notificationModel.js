import mongoose from "mongoose";

const commonFields = {
  message: {
    type: String,
    required: true,
  },
  notificationBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  notificationFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  isViewed: {
    type: Boolean,
    default: false,
  },
  notificationType: {
    type: String,
    required: true,
  },
  notificationEvent: {
    type: String,
    required: true,
  },
};

const notificationSchema = new mongoose.Schema(commonFields, {
  timestamps: true,
});

const PostNotificationSchema = new mongoose.Schema(
  {
    notificationRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const CommentNotificationSchema = new mongoose.Schema(
  {
    notificationRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentRepliesNotificationSchema = new mongoose.Schema(
  {
    notificationRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentsReplies",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FollowNotificationSchema = new mongoose.Schema(
  {
    notificationRef: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model("notifications", notificationSchema);

export const PostNotification = Notification.discriminator(
  "PostNotification",
  PostNotificationSchema
);

export const CommentNotification = Notification.discriminator(
  "CommentNotification",
  CommentNotificationSchema
);
export const CommentRepliesNotification = Notification.discriminator(
  "CommentRepliesNotification",
  CommentRepliesNotificationSchema
);

export const FollowNotification = Notification.discriminator(
  "FollowNotification",
  FollowNotificationSchema
);
