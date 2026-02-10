const router = require("express").Router();
const { requireAuth } = require("../middleware/authMiddleware");
const { matchResumeToJob, getMatches } = require("../controllers/matchController");

router.post("/", requireAuth, matchResumeToJob);
router.get("/", requireAuth, getMatches);

module.exports = router;
