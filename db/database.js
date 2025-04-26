const mongoose = require("mongoose");

const connectDatabase = () => {
  let dbUrl = process.env.MONGODB_URL;
  mongoose
    .connect(dbUrl, {})
    .then((data) => {
      console.log(`MongoDB connected with the server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.error("DocDB connection error v3.42:", err.stack);
      process.exit(1);
    });
};

module.exports = connectDatabase;
