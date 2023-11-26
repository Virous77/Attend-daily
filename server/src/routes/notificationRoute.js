import express from "express";
import { authenticate } from "../middlewares/authentication.js";
import {
  getNotification,
  updateNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/notification", [authenticate], getNotification);
router.put("/notification", [authenticate], updateNotification);

export default router;
