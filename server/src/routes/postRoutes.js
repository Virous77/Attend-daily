import express from "express";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/post");

export default router;
