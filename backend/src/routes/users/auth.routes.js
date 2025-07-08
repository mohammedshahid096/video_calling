const express = require("express");

// * @ validators
const {
  loginUserValidation,
  registerUserValidation,
} = require("@validators/users/user.joi");

// * @ controllers
const {
  loginUserController,
  registerUserController,
} = require("@controllers/users/auth.controller");

const AuthUserRoutes = express.Router();

AuthUserRoutes.route("/login").post(loginUserValidation, loginUserController);
AuthUserRoutes.route("/register").post(
  registerUserValidation,
  registerUserController
);

module.exports = AuthUserRoutes;
