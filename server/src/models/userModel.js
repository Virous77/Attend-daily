import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      required: false,
    },
    userName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", UserSchema);
