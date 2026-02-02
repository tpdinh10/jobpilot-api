const router = require("express").Router();
const { requireAuth } = require("../middleware/authMiddleware");
const { createResume, getResumes } = require("../controllers/resumeController");

router.post("/", requireAuth, createResume);
router.get("/", requireAuth, getResumes);

module.exports = router;
