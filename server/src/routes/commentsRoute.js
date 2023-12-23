import express from "express";
import { authenticate } from "../middlewares/authentication.js";
import {
  addComment,
  addCommentLike,
  addCommentReplies,
  deleteComment,
  getComments,
  getSingleComment,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

//*Comment
router.post("/comment", [authenticate], addComment);
router.get("/comment/:postId", getComments);
router.get("/comment/single/:id/:type", getSingleComment);
router.post("/comment/replies", [authenticate], addCommentReplies);
router.delete("/comment/:id", [authenticate], deleteComment);
router.put("/comment", [authenticate], updateComment);

//*Like
router.put("/comment/like", [authenticate], addCommentLike);

export default router;
