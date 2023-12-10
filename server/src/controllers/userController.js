import userModel from "../models/userModel.js";
import { uploadImage, deleteImages } from "../utils/imageUpload.js";
import { createError, handleCallback, sendResponse } from "../utils/utils.js";
import userNetwork from "../models/userNetwork.js";
import { toggleLikeInComment } from "./postController.js";
import { createNotification } from "./notificationController.js";

export const updateUser = handleCallback(async (req, res, next) => {
  let { image, ...rest } = req.body;

  if (image) {
    image = await uploadImage([image]);
  }

  const packet = {
    ...rest,
    image: image ? image[0].secure_url : req.user.image,
  };

  await userModel.findByIdAndUpdate(req.user._id, packet);
  if (req.user.image && image) {
    await deleteImages([req.user.image]);
  }
  sendResponse({
    res,
    message: "User Profile successfully updated",
    status: true,
    code: 200,
  });
});

export const userNetworkData = handleCallback(async (req, res) => {
  const { userName } = req.params;
  const user = await userModel.findOne({ userName });
  const network = await userNetwork
    .findOne({ userId: user._id })
    .populate({
      path: "followers.id",
      select: "image name userName",
    })
    .populate({
      path: "following.id",
      select: "image name userName",
    });

  sendResponse({
    res,
    data: network,
    message: "User network data successfully fetched",
    status: true,
    code: 200,
  });
});

export const userBookmark = handleCallback(async (req, res) => {
  const bookmarkUser = req.user;
  const { postId } = req.body;

  const newBookmark = await toggleLikeInComment({
    model: userNetwork,
    userId: bookmarkUser._id,
    commentId: postId,
    active: "yes",
  });

  sendResponse({
    status: true,
    code: 200,
    message: "You have Bookmarked post Successfully",
    data: newBookmark,
    res,
  });
});

export const getUser = handleCallback(async (req, res, next) => {
  const userName = req.params.id;

  const user = await userModel.findOne({ userName }).select("-password");

  if (!user)
    return next(createError({ message: "User not found", status: 400 }));

  sendResponse({
    status: true,
    code: 200,
    message: "User fetched Successfully",
    data: user,
    res,
  });
});

const utilityFollow = async (user, followUser, type, key) => {
  if (!type) {
    await userNetwork.findOneAndUpdate(
      { userId: user },
      {
        $push: {
          [key]: {
            id: followUser,
            followedAt: new Date(),
          },
        },
      }
    );
  } else {
    await userNetwork.findOneAndUpdate(
      { userId: user },
      {
        $pull: {
          [key]: {
            id: followUser,
          },
        },
      }
    );
  }
};

export const followUser = handleCallback(async (req, res) => {
  const user = req.user._id;
  const { followUser } = req.body;

  const isFollowing = await userNetwork.findOne(
    {
      userId: user,
      "following.id": followUser,
    },
    { "following.$": 1 }
  );

  if (!isFollowing) {
    await utilityFollow(user, followUser, false, "following");
    await utilityFollow(followUser, user, false, "followers");
    createNotification({
      type: "follow",
      params: {
        notificationBy: user,
        notificationFor: followUser,
        message: "followed you",
        notificationType: "user",
        notificationEvent: "follow",
      },
    });
  } else {
    await utilityFollow(user, followUser, true, "following");
    await utilityFollow(followUser, user, true, "followers");
  }

  sendResponse({
    status: true,
    code: 200,
    message: `You have ${
      !isFollowing ? "Followed" : "Unfollowed"
    } successfully`,
    res,
  });
});
