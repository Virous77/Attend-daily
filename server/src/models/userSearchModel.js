import mongoose from "mongoose";

const userSearchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  searchedUser: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        count: {
          type: Number,
        },
      },
    ],
  },
});

export default mongoose.model("UserSearches", userSearchSchema);
