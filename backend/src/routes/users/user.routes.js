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
  getAllActiveOnlineUsersController,
} = require("@/controllers/users/user.controller");

const UserRoutes = express.Router();

UserRoutes.route("/profile").get(Authentication, myProfileController);
UserRoutes.route("/users-list").get(Authentication, getAllUsersController);
UserRoutes.route("/online-list").get(
  Authentication,
  getAllActiveOnlineUsersController
);

module.exports = UserRoutes;
