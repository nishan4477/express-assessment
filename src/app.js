import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import morgan from "morgan";
import { isAuthenticated, isAuthorized } from "./middlewares/auth.js";
import { MockedDB } from "./mock-db.js";

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

  const { username, password } = req.body;
  const user = db.findUser({ username: username, password: password });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { username: user.username, role: user.role },
    secretKey
  );

  res.json({ token });
  is;
});

// TODO: Make the following route require authentication
app.get("/protected", isAuthenticated, (req, res) => {
  res
    .status(200)
    .json({ message: "You are authorized to access this resource" });
});

// TODO: Make the following route require both authentication and authorization
app.get("/admin", isAuthenticated, isAuthorized, (req, res) => {
  res.status(200).json({
    message: "Hi Admin, you are authorized to access the admin panel.",
  });
});

export default app;
