const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const userToken = require("../utils/userJwtToken");
const Task = require("../models/task");

const userSignUp = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const newUser = await User.create({
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, message), 500);
  }
});

const userSignIn = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Email and password are required", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    res.status(200).json({
      success: true,
      message: "Login Successful!",
      user: {
        id: user._id,
        email: user.email,
        token: userToken(user?._id),
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error, message), 500);
  }
});

const getDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.toString());
    if (!user) {
      return next(new ErrorHandler("user doesn't exist", 400));
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const addTask = catchAsyncErrors(async (req, res, next) => {
  try {
    const { taskName, date, description } = req.body;
    const user = await User.findById(req.user.toString());

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const createTasks = new Task({
      taskName: taskName,
      description: description,
      dueDate: date,
      user: user?._id,
    });

    await createTasks.save();

    res.status(201).json({
      success: true,
      message: "Task created successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const allTasks = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.toString());
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    const tasks = await Task.find({ user: user._id });
    res.status(200).json({
      success: true,
      message: "Tasks returned successfully!",
      tasks,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  userSignUp,
  userSignIn,
  getDetails,
  addTask,
  allTasks,
};
