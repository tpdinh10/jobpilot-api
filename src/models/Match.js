const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "Resume", required: true },

    score: { type: Number, required: true },
    matchedKeywords: { type: [String], default: [] },
    missingKeywords: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);
