import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    image: {
      type: [String],
      required: false,
    },
    video: {
      type: [String],
      required: false,
    },
    pin: {
      type: Boolean,
      default: false,
      required: false,
    },
    postType: {
      type: String,
      required: true,
    },
    totalComments: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      required: false,
    },
    like: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostLikes",
    },
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "polls",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("posts", PostSchema);
