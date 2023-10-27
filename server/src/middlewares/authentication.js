import { handleCallback } from "../utils/utils.js";
import { verifyJwtToken } from "../utils/jwtToken.js";
import userModel from "../models/userModel.js";

export const authenticate = handleCallback(async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json({ status: false, message: "token not found" });
  }

  const decodedToken = await verifyJwtToken(token);
  const user = await userModel.findById(decodedToken.data._id);
  if (!user) return res(400).json({ status: false, message: "user not found" });
  req.user = user;
  req.token = token;
  next();
});
