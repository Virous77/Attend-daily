import express from "express";
import { createUser, loginUser } from "../controllers/authController.js";
import { RegisterValidate, LoginValidate } from "../validation/validate.js";

const router = express.Router();

router.post("/auth/login", LoginValidate, loginUser);
router.post("/auth/register", RegisterValidate, createUser);

export default router;
