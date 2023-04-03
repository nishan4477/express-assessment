import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const secretKey = process.env.JWT_SECRET || "my-secret";

// Define a middleware function to check if the user is authenticated
export const isAuthenticated = (req, res, next) => {
  // TODO: check auth, return 401 if not authenticated
  next();
};

// Define a middleware function to check if the user is authorized
export const isAuthorized = (req, res, next) => {
  // TODO: check if user.role is "admin", if not send 403
  next();
};
