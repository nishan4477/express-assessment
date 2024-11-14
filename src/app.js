import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
import morgan from "morgan";

import exampleApi from "./api/example.js";
import { errorHandler } from "./errorHandler.js";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({ message: "👋🌎🌍🌏" });
});

app.use("/example", exampleApi);

app.use(errorHandler);

app.use((_req, res) => {
  return res.status(404).json({ message: "Route not found" });
});

export default app;
