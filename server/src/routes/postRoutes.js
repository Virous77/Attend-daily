import express from "express";
import { authenticate } from "../middlewares/authentication.js";
import {
  addComment,
  addCommentLike,
  addCommentReplies,
  addPostLike,
  addVote,
  createPoll,
  createPost,
  deletePost,
  getComments,
  getPosts,
  getSingleComment,
  getSinglePost,
  getUserPosts,
  updatePost,
  uploadFiles,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/post", [authenticate], createPost);
router.post("/poll", [authenticate], createPoll);
router.put("/post", [authenticate], updatePost);
router.delete("/post/:id", [authenticate], deletePost);
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
router.put("/vote", [authenticate], addVote);

export default router;
