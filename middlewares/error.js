const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err || 500;
  err.message = err.message || "Internal server Error";
  if (err.name === "CastError") {
    const message = `Resources not found with this id.. Invalid ${err.path}`;
    const customError = new ErrorHandler(message, 400);
    err = customError;
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
