import express from "express";
import { updateUser } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.put("/user", [authenticate], updateUser);

export default router;
