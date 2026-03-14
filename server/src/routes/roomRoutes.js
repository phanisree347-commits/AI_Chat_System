import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createRoom,
  getRoomMessages,
  getRooms,
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/", protect, getRooms);
router.post("/", protect, createRoom);
router.get("/:roomId/messages", protect, getRoomMessages);

export default router;

