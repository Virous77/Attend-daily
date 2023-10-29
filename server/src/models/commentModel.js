import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
    commentedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    like: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comments", CommentSchema);
