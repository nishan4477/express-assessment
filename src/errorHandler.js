import AppError from "./exceptions/AppError.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    const message =
      err.httpStatusCode === 418
        ? "The server refuses the attempt to brew coffee with a teapot."
        : err.message;

    return res.status(err.httpStatusCode).json({
      message,
    });
  }
  return res.status(500).json({
    message: "Unknown error ocurred",
  });
};
