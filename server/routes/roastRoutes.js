import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  uploadAndRoast,
  getHistory,
  getRoastById,
  deleteRoast,
} from "../controllers/roastController.js";

const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadAndRoast);
router.get("/history", protect, getHistory);
router.get("/:id", protect, getRoastById);
router.delete("/:id", protect, deleteRoast);

export default router;
