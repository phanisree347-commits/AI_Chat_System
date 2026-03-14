import express from "express";
import {
  getProfile,
  getUserAchievements,
  getUserProgress,
  getUserStats
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProfile);
router.get("/stats", protect, getUserStats);
router.get("/progress", protect, getUserProgress);
router.get("/achievements", protect, getUserAchievements);

export default router;

