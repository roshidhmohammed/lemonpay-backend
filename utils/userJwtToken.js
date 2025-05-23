const jwt = require("jsonwebtoken");

const userToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
};

module.exports = userToken;
