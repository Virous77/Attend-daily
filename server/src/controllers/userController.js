import userModel from "../models/userModel.js";
import { uploadImage, deleteImages } from "../utils/imageUpload.js";
import { createError, handleCallback, sendResponse } from "../utils/utils.js";
import userNetwork from "../models/userNetwork.js";

export const updateUser = handleCallback(async (req, res, next) => {
  let { image, ...rest } = req.body;

  if (image) {
    image = await uploadImage([image]);
  }

  const packet = {
    ...rest,
    image: image.length > 0 ? image[0].secure_url : req.user.image,
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
  const network = await userNetwork.findOne({ userId: req.user._id });

  sendResponse({
    res,
    data: network,
    message: "User network data successfully fetched",
    status: true,
    code: 200,
  });
});
