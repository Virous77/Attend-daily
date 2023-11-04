import express from "express";
import {
  updateUser,
  userBookmark,
  userNetworkData,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.put("/user", [authenticate], updateUser);
router.get("/user/network", [authenticate], userNetworkData);
router.put("/bookmark", [authenticate], userBookmark);

export default router;
