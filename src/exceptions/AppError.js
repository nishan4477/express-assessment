export default class AppError extends Error {
  httpStatusCode;
  isOperational;

  constructor(message, httpStatusCode, isOperational = false) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype); // ? done to ensure that the instance has the correct prototype chain

    this.httpStatusCode = httpStatusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this); // ? capture stack trace of current instance
  }
}
