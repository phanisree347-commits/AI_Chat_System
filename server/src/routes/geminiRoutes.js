import express from "express";
import { generateWithGemini } from "../controllers/geminiControllers.js";

const router = express.Router();

router.post("/generate", generateWithGemini);

export default router;