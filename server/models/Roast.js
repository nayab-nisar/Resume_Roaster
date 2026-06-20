import mongoose from "mongoose";

const roastSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    heatLevel: {
      type: String,
      enum: ["Mild", "Medium", "Well Done", "Charred"],
      required: true,
    },
    verdict: {
      type: String,
      required: true,
    },
    issues: {
      type: [String],
      default: [],
    },
    strengths: {
      type: [String],
      default: [],
    },
    suggestions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Roast = mongoose.model("Roast", roastSchema);

export default Roast;
