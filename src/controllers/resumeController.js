const Resume = require("../models/Resume");

exports.createResume = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "title and content are required" });
    }

    const resume = await Resume.create({
      userId: req.userId,
      title,
      content
    });

    return res.status(201).json({ resume });
  } catch (err) {
    return res.status(500).json({ message: "server error", error: err.message });
  }
};

exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId }).sort({ createdAt: -1 });
    return res.json({ resumes });
  } catch (err) {
    return res.status(500).json({ message: "server error", error: err.message });
  }
};
