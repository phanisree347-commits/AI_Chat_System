import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// 🔴 BODY PARSER — THIS FIXES YOUR ERROR
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);

// health check
app.get("/", (req, res) => {
  res.send("API running");
});

export default app;
