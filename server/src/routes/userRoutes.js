import express from "express";
import { updateUser, userNetworkData } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.put("/user", [authenticate], updateUser);
router.get("/user/network", [authenticate], userNetworkData);

export default router;
