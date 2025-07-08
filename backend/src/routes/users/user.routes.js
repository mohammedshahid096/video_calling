const express = require("express");

// * @ middlewares
const {
  Authentication,
  setHeaderDevelopment,
} = require("@middlewares/auth.middleware");

// * @ controllers
const {
  myProfileController,
  getAllUsersController,
} = require("@/controllers/users/user.controller");

const UserRoutes = express.Router();

UserRoutes.route("/profile").get(Authentication, myProfileController);
UserRoutes.route("/users-list").get(
  setHeaderDevelopment,
  Authentication,
  getAllUsersController
);

module.exports = UserRoutes;
