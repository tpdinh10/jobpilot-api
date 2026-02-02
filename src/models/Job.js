const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    link: { type: String, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ["saved", "applied", "interview", "offer", "rejected"],
      default: "saved"
    },
    dateApplied: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
