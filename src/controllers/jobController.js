const Job = require("../models/Job");

// Create a job application record for the authenticated user.
// Ownership is enforced by attaching req.userId (set by requireAuth middleware).
exports.createJob = async (req, res) => {
  try {
    const { title, company, link, description, status, dateApplied } = req.body;

    // Minimal validation at API boundary to provide clear client feedback.
    // Additional schema-level validation can live in the Mongoose model.
    if (!title || !company) {
      return res.status(400).json({ message: "title and company are required" });
    }

    const job = await Job.create({
      userId: req.userId, // critical: prevents jobs from being created without an owner
      title,
      company,
      link,
      description,
      status,
      dateApplied
    });

    return res.status(201).json({ job });
  } catch (err) {
    return res.status(500).json({ message: "server error", error: err.message });
  }
};

// Return all jobs owned by the authenticated user.
// Sorting by newest first makes it easier for clients to show recent applications.
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.userId }).sort({ createdAt: -1 });
    return res.json({ jobs });
  } catch (err) {
    return res.status(500).json({ message: "server error", error: err.message });
  }
};

// Fetch a single job by ID, scoped to the authenticated user.
// The userId filter is essential to prevent accessing other users' records.
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.userId });
    if (!job) return res.status(404).json({ message: "job not found" });
    return res.json({ job });
  } catch (err) {
    // Common failure case: invalid ObjectId format
    return res.status(400).json({ message: "invalid job id" });
  }
};

// Update an existing job owned by the authenticated user.
// runValidators ensures updates still respect schema constraints.
exports.updateJob = async (req, res) => {
  try {
    const updates = req.body;

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // ownership enforcement
      updates,
      { new: true, runValidators: true } // return updated doc + enforce schema rules
    );

    if (!job) return res.status(404).json({ message: "job not found" });
    return res.json({ job });
  } catch (err) {
    return res.status(400).json({ message: "update failed", error: err.message });
  }
};

// Delete a job owned by the authenticated user.
// Using findOneAndDelete with userId prevents deleting other users' jobs.
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!job) return res.status(404).json({ message: "job not found" });
    return res.json({ message: "job deleted" });
  } catch (err) {
    return res.status(400).json({ message: "invalid job id" });
  }
};
