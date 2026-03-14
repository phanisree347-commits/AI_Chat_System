import express from "express";
import cors from "cors"
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

const app = express();

// 🔴 BODY PARSER — THIS FIXES YOUR ERROR
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
// routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/rooms", roomRoutes);

// Always return JSON for unknown API routes (avoids HTML responses).
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, message: "API route not found" });
});
// health check
app.get("/", (req, res) => {
  res.send("API running");
});

export default app;
