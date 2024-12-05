import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const secretKey = process.env.JWT_SECRET || "my-secret";

// Define a middleware function to check if the user is authenticated
export const isAuthenticated = (req, res, next) => {
  // TODO: check auth, return 401 if not authenticated

  const token = req.headers.authorization?.replace("Bearer", "");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Middleware authenticated", decoded);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
};

// Define a middleware function to check if the user is authorized
export const isAuthorized = (req, res, next) => {
  // TODO: check if user.role is "admin", if not send 403
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
