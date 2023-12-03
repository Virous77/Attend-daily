import joi from "joi";
import { createError } from "../utils/utils.js";

export const common = async ({ req, res, next, schema }) => {
  try {
    const result = await schema.validateAsync(req.body);
    if (result) {
      next();
    }
  } catch (error) {
    next(createError({ status: 400, message: error.message }));
  }
};

export const RegisterValidate = async (req, res, next) => {
  const schema = joi
    .object({
      name: joi.string().trim().required(),
      email: joi.string().trim().required(),
      password: joi.string().trim().required(),
      userName: joi.string().trim().required(),
    })
    .options({ stripUnknown: true });
  return common({ req, res, next, schema });
};

export const LoginValidate = async (req, res, next) => {
  const schema = joi
    .object({
      email: joi.string().trim().required(),
      password: joi.string().trim().required(),
    })
    .options({ stripUnknown: true });
  return common({ req, res, next, schema });
};

export const PostValidate = async (req, res, next) => {
  const schema = joi
    .object({
      userId: joi.string().trim().required(),
      postType: joi.string().trim().required(),
    })
    .options({ stripUnknown: true });
  return common({ req, res, next, schema });
};

export const PollValidate = async (req, res, next) => {
  const schema = joi
    .object({
      userId: joi.string().trim().required(),
      postId: joi.string().trim().required(),
      choice: joi.array().required(),
      expiryDate: joi.number().required(),
    })
    .options({ stripUnknown: true });
  return common({ req, res, next, schema });
};

export const AddResPostValidate = async (req, res, next) => {
  const schema = joi
    .object({
      userId: joi.string().trim().required(),
      postType: joi.string().trim().required(),
      repostRef: joi.string().trim().required(),
    })
    .options({ stripUnknown: true });
  return common({ req, res, next, schema });
};
