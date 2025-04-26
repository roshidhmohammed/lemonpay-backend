const express = require("express");
const app = express();
const cors = require("cors");
const ErrorHandler = require("./middlewares/error");

// Routes
const userRoutes = require("./routes/userRoutes");

app.use(cors());

app.use(express.json());
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}
app.use("/test", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", userRoutes);

app.use(ErrorHandler);

module.exports = app;
