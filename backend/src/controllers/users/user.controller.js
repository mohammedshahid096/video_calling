const httpErrors = require("http-errors");
const USER_CONSTANTS = require("../../constants/user.constants");
const logger = require("../../config/logger.config");
const errorHandling = require("../../utils/errorHandling");
const userModel = require("../../schema/users/user.model");
const { responseJsonHandler } = require("../../utils/responseHandling");

const myProfileController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - user.controller - myProfileController - start"
    );
    const userDetails = req.user;

    logger.info(
      "controller - users - user.controller - myProfileController - End"
    );
    responseJsonHandler(
      {
        message: USER_CONSTANTS.USER_PROFILE_FETCHED,
        data: userDetails,
      },
      res
    );
  } catch (error) {
    logger.error(
      "controller - users - user.controller - myProfileController - End",
      error
    );
    return errorHandling(error, res);
  }
};

module.exports = {
  myProfileController,
};
