const Job = require("../models/Job");
const Resume = require("../models/Resume");
const Match = require("../models/Match");
const { getMatchScore } = require("../services/matchService");

exports.matchResumeToJob = async (req, res) => {
  try {
    const { jobId, resumeId } = req.body;

    if (!jobId || !resumeId) {
      return res.status(400).json({ message: "jobId and resumeId are required" });
    }

    const job = await Job.findOne({ _id: jobId, userId: req.userId });
    const resume = await Resume.findOne({ _id: resumeId, userId: req.userId });

    if (!job || !resume) {
      return res.status(404).json({ message: "job or resume not found" });
    }

    const result = getMatchScore(resume.content, job.description || "");

    const saved = await Match.create({
      userId: req.userId,
      jobId,
      resumeId,
      score: result.score,
      matchedKeywords: result.matchedKeywords,
      missingKeywords: result.missingKeywords
    });

    return res.json({
      jobId,
      resumeId,
      ...result,
      matchId: saved._id
    });
  } catch (err) {
    return res.status(500).json({ message: "server error", error: err.message });
  }
};

exports.getMatches = async (req, res) => {
  try {
    const { jobId, resumeId } = req.query;

    const filter = { userId: req.userId };
    if (jobId) filter.jobId = jobId;
    if (resumeId) filter.resumeId = resumeId;

    const matches = await Match.find(filter).sort({ createdAt: -1 });

    return res.json({ matches });
  } catch (err) {
    return res.status(500).json({ message: "server error", error: err.message });
  }
};

