const httpErrors = require("http-errors");

// * @ schemas
const userModel = require("@schema/users/user.model");

// * @ config
const logger = require("@config/logger.config");

// * @ utils
const { responseJsonHandler } = require("@utils/responseHandling");
const errorHandling = require("@utils/errorHandling");

// * @ constants
const USER_CONSTANTS = require("@constants/user.constants");

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

const getAllUsersController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - user.controller - getAllUsersController - start"
    );

    let query = {
      _id: { $ne: req.user._id },
    };

    const users = await userModel.find(
      query,
      "email userName name profileImage"
    );

    logger.info(
      "controller - users - user.controller - getAllUsersController - End"
    );
    responseJsonHandler(
      {
        message: USER_CONSTANTS.USERS_FETCHED,
        data: users,
      },
      res
    );
  } catch (error) {
    logger.error(
      "controller - users - user.controller - getAllUsersController - End",
      error
    );
    return errorHandling(error, res);
  }
};

module.exports = {
  myProfileController,
  getAllUsersController,
};
