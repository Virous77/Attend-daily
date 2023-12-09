import userModel from "../models/userModel.js";
import { createError, handleCallback, sendResponse } from "../utils/utils.js";
import bcrypt from "bcryptjs";
import { createJwtToken } from "../utils/jwtToken.js";
import userNetwork from "../models/userNetwork.js";

export const loginUser = handleCallback(async (req, res, next) => {
  const { email, password: userPassword } = req.body;

  const user = await userModel.findOne({ email: email.toLowerCase() });

  if (!user)
    return next(createError({ status: 400, message: "Email ID not exists" }));

  const pass = await bcrypt.compare(userPassword, user.password);
  if (!pass)
    return next(createError({ status: 400, message: "Password is incorrect" }));

  const { password, ...otherData } = user._doc;
  const token = await createJwtToken(otherData);
  sendResponse({
    data: token,
    message: "User login successfully.",
    status: true,
    res: res,
    code: 200,
  });
});

export const createUser = handleCallback(async (req, res, next) => {
  const { email, password, name, userName } = req.body;

  const findUser = await userModel.findOne({ email: email.toLowerCase() });

  if (findUser)
    return next(
      createError({ status: 400, message: "Email ID already exists." })
    );

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = new userModel({
    email: email.toLowerCase(),
    password: hash,
    name,
    userName,
  });
  await user.save();
  const network = new userNetwork({ userId: user._id });
  await network.save();

  sendResponse({
    message: "User registered successfully.",
    status: true,
    res: res,
    code: 201,
  });
});

export const checkUserName = handleCallback(async (req, res) => {
  const { username } = req.query;

  const user = await userModel.findOne({
    userName: { $regex: new RegExp(`^${username}$`, "i") },
  });

  sendResponse({
    message: "Username status checked successfully.",
    data: user ? true : false,
    code: 200,
    status: true,
    res,
  });
});

export const status = handleCallback(async (req, res) => {
  const { _id } = req.user._doc;

  const user = await userModel.findById(_id).select("-password");

  sendResponse({
    data: { ...user._doc, token: req.token },
    message: "User status fetched successfully",
    status: true,
    res,
    code: 200,
  });
});
