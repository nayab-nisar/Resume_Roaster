import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import roastRoutes from "./routes/roastRoutes.js";

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",") || "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/roast", roastRoutes);

app.get("/", (req, res) => {
  res.send("Resume Roaster API is running.");
});

app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: err.message || "Something went wrong." });
  }
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));