import mongoose from "mongoose";

const NetworkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
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
    totalPost: {
      type: Number,
      default: 0,
    },
    bookMarks: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Networks", NetworkSchema);
