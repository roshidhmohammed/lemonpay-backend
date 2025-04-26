const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

const isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return next(new ErrorHandler("Not authorized, no token", 401));
      }
      const updatedToken = token.replace(/^"|"$/g, "");
      const decoded = jwt.verify(updatedToken, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user?._id;
        next();
      } else {
        return next(new ErrorHandler("Not authorized to login", 403));
      }
    } catch (error) {
      return next(new ErrorHandler("Not authorized, token failed", 401));
    }
  }
});

module.exports = { isUserAuthenticated };
