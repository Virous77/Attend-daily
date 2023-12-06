import { handleCallback, createError, sendResponse } from "../utils/utils.js";
import userModel from "../models/userModel.js";
import userSearchModel from "../models/userSearchModel.js";

export const searchQuery = handleCallback(async (req, res, next) => {
  const { query } = req.query;
  if (!query)
    return next(createError({ message: "Query is required", status: 400 }));

  const users = await userModel
    .find({
      $or: [
        { userName: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
      ],
    })
    .select("name userName image _id");

  sendResponse({
    message: "Search results",
    data: users,
    code: 200,
    status: true,
    res,
  });
});

export const addRecentSearch = handleCallback(async (req, res, next) => {
  const userId = req.user._id;
  const { searchedUser } = req.body;
  if (!searchedUser)
    return next(
      createError({
        message: "SearchedUser is required",
        status: 400,
      })
    );

  const userSearch = await userSearchModel.findOne({ userId });
  if (!userSearch) {
    const newUserSearch = new userSearchModel({
      userId,
      searchedUser: [{ user: searchedUser, count: 1 }],
    });
    await newUserSearch.save();
  } else {
    if (userSearch.searchedUser.length === 10) {
      userSearch.searchedUser.pop();
    }

    const searchedUserIndex = userSearch.searchedUser.findIndex(
      (user) => user.user.toString() === searchedUser.toString()
    );
    if (searchedUserIndex === -1) {
      userSearch.searchedUser.push({ user: searchedUser, count: 1 });
    } else {
      userSearch.searchedUser[searchedUserIndex].count += 1;
    }
    await userSearch.save();
  }

  sendResponse({
    message: "Recent search added",
    data: null,
    code: 200,
    status: true,
    res,
  });
});

export const userRecentSearch = handleCallback(async (req, res, next) => {
  const userId = req.user._id;
  const userSearch = await userSearchModel
    .findOne({ userId })
    .populate("searchedUser.user", "name userName image _id");

  sendResponse({
    message: "Fetched Recent search successfully",
    data: userSearch?.searchedUser,
    code: 200,
    status: true,
    res,
  });
});
