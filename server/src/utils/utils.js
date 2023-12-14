import errorLogModel from "../models/errorLogModel.js";

export const handleCallback = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      await errorLogModel.create({ error: JSON.stringify(error) });
      next(error);
    }
  };
};

export const createError = ({ status, message }) => {
  const err = new Error();
  (err.status = status), (err.message = message);

  return err;
};

export const sendResponse = ({ code, data, message, status, res }) => {
  res.status(code).json({
    data: data ? data : null,
    message,
    status,
  });
};

const currentDate = new Date();
export const fifteenDaysAgo = new Date(currentDate);
fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
