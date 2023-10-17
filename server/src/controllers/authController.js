import userModel from "../models/userModel.js";
import { createError, handleCallback, sendResponse } from "../utils/utils.js";
import bcrypt from "bcryptjs";
import { createJwtToken } from "../utils/jwtToken.js";

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
  const { email, password, name } = req.body;

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
  });
  await user.save();

  sendResponse({
    message: "User registered successfully.",
    status: true,
    res: res,
    code: 201,
  });
});
