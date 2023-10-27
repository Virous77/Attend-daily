import express from "express";
import {
  createUser,
  loginUser,
  status,
} from "../controllers/authController.js";
import { RegisterValidate, LoginValidate } from "../validation/validate.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/auth/login", LoginValidate, loginUser);
router.post("/auth/register", RegisterValidate, createUser);
router.get("/auth/status", [authenticate], status);

export default router;
