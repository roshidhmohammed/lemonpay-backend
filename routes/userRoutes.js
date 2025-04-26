const express = require("express");
const { isUserAuthenticated } = require("../middlewares/isUserAuthenticated");

const {
    userSignUp,
    userSignIn,
    getDetails
  } = require("../controllers/user");


  const router = express.Router();


  router.route("/sign-up").post(userSignUp);
  router.route("/sign-in").post(userSignIn);
  router.route("/get-details").get(isUserAuthenticated, getDetails);
  


  module.exports = router;