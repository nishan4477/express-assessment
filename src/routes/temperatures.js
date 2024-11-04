import { Router } from "express";
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} from "../controllers/temperature.controller.js";

const router = Router();
router.route("/to-celsius").post(fahrenheitToCelsius);
router.route("/to-fahrenheit").post(celsiusToFahrenheit);

export default router;
