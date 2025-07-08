const express = require("express");
const {
  loginUserController,
  registerUserController,
} = require("@controllers/users/auth.controller");
const {
  loginUserValidation,
  registerUserValidation,
} = require("@validators/users/user.joi");

const AuthUserRoutes = express.Router();

AuthUserRoutes.route("/login").post(loginUserValidation, loginUserController);
AuthUserRoutes.route("/register").post(
  registerUserValidation,
  registerUserController
);

module.exports = AuthUserRoutes;
