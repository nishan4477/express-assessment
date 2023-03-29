const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// TODO: add your /to-celsius and /to-fahrenheit POST routes here:

app.get("/", (req, res) => {
  res.json({ message: "👋🌎🌍🌏" });
});

module.exports = app;
