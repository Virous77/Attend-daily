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
      type: ["post", "poll"],
      required: true,
    },
    like: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostLikes",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("posts", PostSchema);
