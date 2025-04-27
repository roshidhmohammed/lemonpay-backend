const express = require("express");
const { isUserAuthenticated } = require("../middlewares/isUserAuthenticated");
const {
    userSignUp,
    userSignIn,
    getDetails,
    addTask,
    allTasks,
    singleTask,
    editTask,
    deleteTask
  } = require("../controllers/user");
const { validateSignUp, validateSignIn, validateAddTask, validateEditTask, validateDeleteTask, validateAuthenticationHeader } = require("../validator/inputValidator");
const { handleValidationErrors } = require("../middlewares/handleValidationErrors");

  const router = express.Router();

  router.route("/sign-up").post(validateSignUp,handleValidationErrors, userSignUp);
  router.route("/sign-in").post(validateSignIn,handleValidationErrors, userSignIn);
  router.route("/get-details").get(validateAuthenticationHeader,handleValidationErrors,isUserAuthenticated, getDetails);
  router.route("/add-task").post(isUserAuthenticated,validateAddTask,handleValidationErrors,  addTask);
  router.route("/all-tasks").get(isUserAuthenticated, allTasks);
  router.route("/single-task/:id").get(isUserAuthenticated, singleTask);
  router.route("/edit-task/:id").put(isUserAuthenticated,validateEditTask,handleValidationErrors,  editTask);
  router.route("/delete-task/:id").delete(isUserAuthenticated,validateDeleteTask, handleValidationErrors, deleteTask);

  module.exports = router;