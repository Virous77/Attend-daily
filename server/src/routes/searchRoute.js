import express from "express";

import { authenticate } from "../middlewares/authentication.js";
import {
  addRecentSearch,
  searchQuery,
} from "../controllers/searchController.js";

const router = express.Router();

router.get("/search", [authenticate], searchQuery);
router.post("/search/add", [authenticate], addRecentSearch);

export default router;
