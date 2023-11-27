import postModel from "../models/postModel.js";
import { createError, handleCallback, sendResponse } from "../utils/utils.js";
import retweetUsersModel from "../models/retweetUsersModel.js";
import { createNotification } from "./notificationController.js";

export const addRePost = handleCallback(async (req, res, next) => {
  const user = req.user;
  const { postId } = req.body;

  const post = await postModel.findById(postId);
  if (!post)
    return next(
      createError({ message: "Original Post not found.", status: 404 })
    );
  const {
    _id,
    userId,
    isRetweeted,
    originalPost,
    createdAt,
    updatedAt,
    ...rest
  } = post.toObject();

  createNotification({
    type: "post",
    params: {
      notificationBy: user._id.toString(),
      notificationFor: userId.toString(),
      message: "reposted your post",
      notificationType: "post",
      notificationRef: postId,
      notificationEvent: "repost",
    },
  });

  const packet = {
    ...rest,
    originalPost: isRetweeted ? originalPost : _id,
    userId: user._id,
    isRetweeted: true,
  };

  await postModel.create(packet);
  const findRetweetRef = await retweetUsersModel.findOne({
    postId: isRetweeted ? originalPost : _id,
  });
  if (!findRetweetRef) {
    const newRetweetRef = await retweetUsersModel.create({
      postId: _id,
      users: [user._id],
    });
    post.retweetUser = newRetweetRef._id;
    await post.save();
  } else {
    findRetweetRef.users.push(user._id);
    findRetweetRef.save();
  }
  return sendResponse({
    status: true,
    code: 200,
    message: "Reposted Successfully",
    res,
  });
});

export const removeRePost = handleCallback(async (req, res, next) => {
  const user = req.user;
  const rePost = await postModel.findById(req.params.id);

  if (!rePost)
    return next(createError({ message: "Post not found", status: 404 }));

  if (!rePost.userId.equals(user._id))
    return next(
      createError({
        message: "You are not authorized for this action",
        status: 400,
      })
    );

  await postModel.findByIdAndDelete(req.params.id);
  await retweetUsersModel.findOneAndUpdate(
    { postId: rePost.originalPost },
    { $pull: { users: user._id } },
    { new: true }
  );

  return sendResponse({
    status: true,
    code: 200,
    message: "Reposted removed Successfully",
    res,
  });
});
