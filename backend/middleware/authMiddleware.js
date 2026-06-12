import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check header exists and is in "Bearer <token>" format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Guard against literally saved "null" or "undefined" strings
    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Logs the exact reason: TokenExpiredError, JsonWebTokenError, etc.
    console.error("Auth middleware error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired — please log in again" });
    }

    res.status(401).json({ success: false, message: "Invalid token" });
  }
};