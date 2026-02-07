import express from "express";
import { loginUser } from "../controllers/authControllers.js";
import {registerUser} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
