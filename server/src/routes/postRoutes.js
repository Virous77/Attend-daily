import express from "express";
import { authenticate } from "../middlewares/authentication.js";
import {
  addComment,
  addCommentLike,
  addCommentReplies,
  addPostLike,
  createPost,
  getComments,
  getPosts,
  getSingleComment,
  getSinglePost,
  getUserPosts,
  uploadFiles,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/post", [authenticate], createPost);
router.get("/post/all/:id", [authenticate], getUserPosts);
router.get("/feed/post", [authenticate], getPosts);
router.get("/post/:id", [authenticate], getSinglePost);
router.post("/comment", [authenticate], addComment);
router.get("/comment/:postId", [authenticate], getComments);
router.get("/comment/single/:id/:type", [authenticate], getSingleComment);
router.post("/comment/replies", [authenticate], addCommentReplies);
router.put("/comment/like", [authenticate], addCommentLike);
router.put("/like", [authenticate], addPostLike);
router.post("/upload", [authenticate], uploadFiles);

export default router;
