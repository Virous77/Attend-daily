import pollModel from "../models/pollModel.js";
import postLikeModel from "../models/postLikeModel.js";
import postModel from "../models/postModel.js";
import { createError, handleCallback, sendResponse } from "../utils/utils.js";

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
