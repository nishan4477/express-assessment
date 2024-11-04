import { asyncHandler } from "../utils/AsyncHandler.js";

const fahrenheitToCelsius = asyncHandler(async (req, res) => {
  const fahrenheit = req.body.fahrenheit;
  const celsius = ((fahrenheit - 32) * 5) / 9;
  res.json({ celsius });
});

const celsiusToFahrenheit = asyncHandler(async (req, res) => {
  const celsius = req.body.celsius;
  const fahrenheit = (celsius * 9) / 5 + 32;
  res.json({ fahrenheit });
});

export { celsiusToFahrenheit, fahrenheitToCelsius };
