const express = require("express");
const app = express();
const cors = require("cors");
const ErrorHandler = require("./middlewares/error");
const a =process.env.PORT

// cors
app.use(  cors({
    origin:process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));

// Routes
const userRoutes = require("./routes/userRoutes");


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

console.log(a)

app.use(ErrorHandler);

module.exports = app;
