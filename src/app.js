import express, { json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { MockedDB } from "./mock-db.js";
import { isAuthenticated, isAuthorized } from "./middlewares/auth.js";

config();

const secretKey = process.env.JWT_SECRET || "my-secret";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(json());

const db = new MockedDB();

// Define a login route to authenticate the user and generate a JWT token
app.post("/login", (req, res) => {
  /**
   * TODO: Authenticate the user and sign a JWT token
   * Use the following code to get user info from db:
   * const user = db.findUser({ username: "admin", password: "password" });
   *
   * user will return undefined if not found
   */
});

// TODO: Make the following route require authentication
app.get("/protected", (req, res) => {
  res
    .status(200)
    .json({ message: "You are authorized to access this resource" });
});

// TODO: Make the following route require both authentication and authorization
app.get("/admin", (req, res) => {
  res.status(200).json({
    message: "Hi Admin, you are authorized to access the admin panel.",
  });
});

export default app;
