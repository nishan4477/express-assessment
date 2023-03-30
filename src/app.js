import express, { json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import exampleApi from "./api/example.js";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({ message: "👋🌎🌍🌏" });
});

app.use("/example", exampleApi);

export default app;
