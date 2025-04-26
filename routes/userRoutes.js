const express = require("express");
const { isUserAuthenticated } = require("../middlewares/isUserAuthenticated");

const {
    userSignUp,
    userSignIn,
    getDetails,
    addTask,
    allTasks
  } = require("../controllers/user");


  const router = express.Router();


  router.route("/sign-up").post(userSignUp);
  router.route("/sign-in").post(userSignIn);
  router.route("/get-details").get(isUserAuthenticated, getDetails);
  router.route("/add-task").post(isUserAuthenticated, addTask);
  router.route("/all-tasks").get(isUserAuthenticated, allTasks);

  

  
  


  module.exports = router;