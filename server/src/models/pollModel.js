import mongoose from "mongoose";

const PollSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    expiryDate: {
      type: Number,
      required: true,
    },
    choice: {
      type: [String],
      required: true,
    },
    vote: {
      type: [Number],
      required: false,
    },
    voters: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("polls", PollSchema);
