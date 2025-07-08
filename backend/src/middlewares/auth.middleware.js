const httpErrors = require("http-errors");

const userModel = require("@schema/users/user.model");

const { verifyAccessToken } = require("@utils/jwt.token");
const errorHandling = require("@utils/errorHandling");

const {
  DEVELOPMENT_ACCESS_USER_TOKEN,
  DEVELOPMENT_MODE,
} = require("@config/index.config");
const logger = require("@config/logger.config");

const {
  AUTHORIZATION_REQUIRED,
  AUTHENTICATION_TOKEN_REQUIRED,
} = require("../constants/auth.constants");
const { USER_NOT_FOUND } = require("@constants/user.constants");

// for authentication
module.exports.Authentication = async (req, res, next) => {
  try {
    let authHeader = req.header("Authorization");
    if (DEVELOPMENT_MODE === "development" && req?.authToken) {
      authHeader = req.authToken;
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(httpErrors.Unauthorized(AUTHENTICATION_TOKEN_REQUIRED));
    }

    const token = authHeader.split(" ")[1];
    const decode = await verifyAccessToken(token);
    if (!decode.success) {
      return next(httpErrors.Unauthorized(decode.error.message));
    }

    let userExist = null;
    console.log(decode);

    userExist = await userModel.findById(decode.id).lean();

    if (!userExist) {
      return next(httpErrors.NotFound(USER_NOT_FOUND));
    }
    userExist._id = userExist._id.toString();
    req.user = userExist;
    logger.info(`req Email : ${userExist?.email || userExist?.name} `);
    next();
  } catch (error) {
    errorHandling.handleCustomErrorService(error, next);
  }
};

// authorization depending  upon a role
module.exports.Authorization = (...roles) => {
  return (req, res, next) => {
    const userRole = req.__type__;
    if (!roles.includes(userRole)) {
      return next(httpErrors.Unauthorized(AUTHORIZATION_REQUIRED));
    }
    next();
  };
};

// setting headers for the development purpose
module.exports.setHeaderDevelopment = (req, res, next) => {
  let token = DEVELOPMENT_ACCESS_USER_TOKEN;
  req.authToken = token;
  next();
};
