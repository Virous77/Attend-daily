import mongoose from "mongoose";

const ErrorSchema = new mongoose.Schema(
  {
    error: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("errorLog", ErrorSchema);
