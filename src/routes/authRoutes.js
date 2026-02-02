const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");
const User = require("../models/User");

router.post("/register", register);
router.post("/login", login);

router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.userId).select("_id name email createdAt");
  if (!user) return res.status(404).json({ message: "user not found" });
  return res.json({ user });
});

module.exports = router;
