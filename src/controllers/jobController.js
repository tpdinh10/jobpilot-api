const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const { title, company, link, description, status, dateApplied } = req.body;

    if (!title || !company) {
      return res.status(400).json({ message: "title and company are required" });
    }

    const job = await Job.create({
      userId: req.userId,
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

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    return res.json({ jobs });
  } catch (err) {
    return res.status(500).json({ message: "server error", error: err.message });
  }
};
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.userId });
    if (!job) return res.status(404).json({ message: "job not found" });
    return res.json({ job });
  } catch (err) {
    return res.status(400).json({ message: "invalid job id" });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const updates = req.body;

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!job) return res.status(404).json({ message: "job not found" });
    return res.json({ job });
  } catch (err) {
    return res.status(400).json({ message: "update failed", error: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!job) return res.status(404).json({ message: "job not found" });
    return res.json({ message: "job deleted" });
  } catch (err) {
    return res.status(400).json({ message: "invalid job id" });
  }
};
