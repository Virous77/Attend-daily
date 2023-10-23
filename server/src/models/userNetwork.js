import mongoose from "mongoose";

const NetworkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  followers: {
    type: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        followedAt: Date,
      },
    ],
    required: false,
  },
  following: {
    type: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        followedAt: Date,
      },
    ],
    required: false,
  },
});

export default mongoose.model("Networks", NetworkSchema);
