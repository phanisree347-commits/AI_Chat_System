import jwt from "jsonwebtoken";

// Protect routes by validating a JWT in the Authorization header.
// Expected header: Authorization: Bearer <token>
export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length).trim()
      : null;

    if (!token) {
      return res.status(401).json({ message: "Not authorized: missing token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info for controllers to use.
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized: invalid token" });
  }
};

