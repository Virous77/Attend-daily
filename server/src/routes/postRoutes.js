import express from "express";
import { authenticate } from "../middlewares/authentication.js";
import {
  addPostLike,
  addVote,
  createPost,
  deletePost,
  getExplorePosts,
  getPosts,
  getSinglePost,
  getUserPosts,
  getUserPostsByType,
  toggleUserPinPost,
  updatePost,
  uploadFiles,
  userPinPost,
} from "../controllers/postController.js";
import { createPoll, updatePoll } from "../controllers/pollController.js";
import {
  addQuoteRepost,
  addRePost,
  removeRePost,
} from "../controllers/rePostController.js";
import {
  AddResPostValidate,
  PollValidate,
  PostValidate,
} from "../validation/validate.js";

const router = express.Router();

router.post("/post", [authenticate, PostValidate], createPost);
router.put("/post", [authenticate], updatePost);
router.delete("/post/:id", [authenticate], deletePost);
router.post("/upload", [authenticate], uploadFiles);
router.put("/vote", [authenticate], addVote);
router.put("/pin", [authenticate], toggleUserPinPost);

//*Like
router.put("/like", [authenticate], addPostLike);

//*Post Query
router.get("/post/all/:id", [authenticate], getUserPosts);
router.get("/post/type/:id/:type", [authenticate], getUserPostsByType);
router.get("/feed/post", getPosts);
router.get("/post/:id", getSinglePost);
router.get("/pin", [authenticate], userPinPost);
router.get("/explore", getExplorePosts);

//*Poll
router.post("/poll", [authenticate, PollValidate], createPoll);
router.put("/poll", [authenticate], updatePoll);

//*RePost
router.post("/repost", [authenticate], addRePost);
router.delete("/repost/:id", [authenticate], removeRePost);
router.post(
  "/quote/repost",
  [authenticate, AddResPostValidate],
  addQuoteRepost
);

export default router;
