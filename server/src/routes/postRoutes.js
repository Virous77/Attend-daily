import express from "express";
import { authenticate } from "../middlewares/authentication.js";
import {
  addComment,
  addCommentLike,
  addCommentReplies,
  addPostLike,
  createPost,
  getComments,
  getUserPosts,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/post", [authenticate], createPost);
router.get("/post", [authenticate], getUserPosts);
router.post("/comment", [authenticate], addComment);
router.get("/comment/:postId", [authenticate], getComments);
router.post("/comment/replies", [authenticate], addCommentReplies);
router.put("/comment/like", [authenticate], addCommentLike);
router.put("/like", [authenticate], addPostLike);

export default router;
