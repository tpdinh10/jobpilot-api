const router = require("express").Router();
const { requireAuth } = require("../middleware/authMiddleware");
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

router.post("/", requireAuth, createJob);
router.get("/", requireAuth, getJobs);

router.get("/:id", requireAuth, getJobById);
router.put("/:id", requireAuth, updateJob);
router.delete("/:id", requireAuth, deleteJob);

module.exports = router;
