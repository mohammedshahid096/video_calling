const express = require("express");
const { myProfileController } = require("@/controllers/users/user.controller");
const {
  Authentication,
  setHeaderDevelopment,
} = require("@middlewares/auth.middleware");

const UserRoutes = express.Router();

UserRoutes.route("/profile").get(Authentication, myProfileController);

module.exports = UserRoutes;
