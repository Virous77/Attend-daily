import express from "express";
import { authenticate } from "../middlewares/authentication.js";
import {
  addComment,
  addCommentLike,
  addCommentReplies,
  addPostLike,
  addVote,
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
import { createPoll, updatePoll } from "../controllers/pollController.js";
import { addRePost, removeRePost } from "../controllers/rePostController.js";

const router = express.Router();

router.post("/post", [authenticate], createPost);
router.put("/post", [authenticate], updatePost);
router.delete("/post/:id", [authenticate], deletePost);
router.post("/upload", [authenticate], uploadFiles);
router.put("/vote", [authenticate], addVote);

//*Comment
router.post("/comment", [authenticate], addComment);
router.get("/comment/:postId", [authenticate], getComments);
router.get("/comment/single/:id/:type", [authenticate], getSingleComment);
router.post("/comment/replies", [authenticate], addCommentReplies);

//*Like
router.put("/like", [authenticate], addPostLike);
router.put("/comment/like", [authenticate], addCommentLike);

//*Post Query
router.get("/post/all/:id", [authenticate], getUserPosts);
router.get("/feed/post", [authenticate], getPosts);
router.get("/post/:id", [authenticate], getSinglePost);

//*Poll
router.post("/poll", [authenticate], createPoll);
router.put("/poll", [authenticate], updatePoll);

//*RePost
router.post("/repost", [authenticate], addRePost);
router.delete("/repost/:id", [authenticate], removeRePost);

export default router;
