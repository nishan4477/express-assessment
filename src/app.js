import express, { json } from "express";
// import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

const app = express();

// You may toggle this on when developing
// app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(json());

// TODO: add your /to-celsius and /to-fahrenheit POST handlers here:

app.get("/", (req, res) => {
  res.json({ message: "👋🌎🌍🌏" });
});

export default app;
