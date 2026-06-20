import Roast from "../models/Roast.js";
import { extractResumeText } from "../utils/extractResumeText.js";
import { generateRoast } from "../utils/geminiRoast.js";

export const uploadAndRoast = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Attach a PDF resume to roast." });
    }

    const text = await extractResumeText(req.file.buffer);

    if (!text || text.length < 50) {
      return res.status(422).json({
        message: "Couldn't read enough text from that PDF. Try a text-based (not scanned) resume.",
      });
    }

    const roastResult = await generateRoast(text);

    const roast = await Roast.create({
      user: req.user._id,
      fileName: req.file.originalname,
      ...roastResult,
    });

    res.status(201).json(roast);
  } catch (err) {
    console.error("Roast generation failed:", err);
    res.status(500).json({ message: "The roast machine jammed. Try again in a moment.", error: err.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const roasts = await Roast.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("fileName score heatLevel verdict createdAt");
    res.json(roasts);
  } catch (err) {
    res.status(500).json({ message: "Could not load roast history.", error: err.message });
  }
};

export const getRoastById = async (req, res) => {
  try {
    const roast = await Roast.findOne({ _id: req.params.id, user: req.user._id });
    if (!roast) {
      return res.status(404).json({ message: "Roast not found." });
    }
    res.json(roast);
  } catch (err) {
    res.status(500).json({ message: "Could not load that roast.", error: err.message });
  }
};

export const deleteRoast = async (req, res) => {
  try {
    const roast = await Roast.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!roast) {
      return res.status(404).json({ message: "Roast not found." });
    }
    res.json({ message: "Roast deleted." });
  } catch (err) {
    res.status(500).json({ message: "Could not delete that roast.", error: err.message });
  }
};
