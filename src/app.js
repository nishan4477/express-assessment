import express, { json } from "express";
// import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { stealAmount } from "./_middlewares/stealAmount.js";
import transactionApi from "./api/transaction.js";

const app = express();

// app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(json());

app.use((req, res, next) => {
  if (req.method == "POST" && !req.body.amount) {
    req.body.amount = 0;
  }
  next();
});

app.use("/transaction", stealAmount);
app.use("/transaction", transactionApi);

app.post("/another-route", (req, res) => {
  res.status(200).json({ amount: req.body.amount });
});

app.patch("/another-route", (req, res) => {
  res.status(200).json({ amount: req.body.amount });
});

export default app;
