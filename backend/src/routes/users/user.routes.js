const express = require("express");

// @ middlewares
const {
  Authentication,
  setHeaderDevelopment,
} = require("@middlewares/auth.middleware");

// @ controllers
const { myProfileController } = require("@/controllers/users/user.controller");

const UserRoutes = express.Router();

UserRoutes.route("/profile").get(Authentication, myProfileController);

module.exports = UserRoutes;
