const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    // Ownership: every job belongs to a specific authenticated user.
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Core job information
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },

    // Optional metadata
    link: { type: String, trim: true },
    description: { type: String, trim: true },

    // Application pipeline state
    status: {
      type: String,
      enum: ["saved", "applied", "interview", "offer", "rejected"],
      default: "saved"
    },

    // Tracks when application was submitted
    dateApplied: { type: Date }
  },
  { timestamps: true } // adds createdAt + updatedAt
);

// Index to optimize queries that filter by userId and sort by newest first.
// This matches how getJobs() queries are performed.
jobSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Job", jobSchema);
