import express from "express";
import {
  followUser,
  getUser,
  updateUser,
  userBookmark,
  userNetworkData,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.put("/user", [authenticate], updateUser);
router.get("/profile/:id", [authenticate], getUser);
router.get("/user/network", [authenticate], userNetworkData);
router.put("/bookmark", [authenticate], userBookmark);
router.post("/follow", [authenticate], followUser);

export default router;
