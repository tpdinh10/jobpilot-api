const jwt = require("jsonwebtoken");

// Middleware to protect routes using JWT authentication.
// Expects Authorization header in the format:
// Authorization: Bearer <token>
exports.requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  // Validate correct Bearer format before attempting verification
  if (type !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "missing or invalid Authorization header" });
  }

  try {
    // Verify token integrity and expiration using server secret
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Store user identity on request object for downstream controllers
    // Using `sub` (subject) follows JWT standard claims convention
    req.userId = payload.sub;

    return next();
  } catch (err) {
    // Token is invalid, tampered, or expired
    return res.status(401).json({ message: "invalid or expired token" });
  }
};
