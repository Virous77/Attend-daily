import userModel from "../models/userModel.js";
import { createError, handleCallback, sendResponse } from "../utils/utils.js";

export const updateUser = handleCallback(async (req, res, next) => {
  console.log(req.body);
});
