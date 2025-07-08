const httpErrors = require("http-errors");

// * @ schemas
const userModel = require("@schema/users/user.model");

// * @ config
const logger = require("@config/logger.config");

// * @ utils
const { verifyPasswordMethod } = require("@utils/verify.password");
const { createAccessToken } = require("@utils/jwt.token");
const { responseJsonHandler } = require("@utils/responseHandling");
const errorHandling = require("@utils/errorHandling");

// * @ constants
const USER_CONSTANTS = require("@constants/user.constants");

const loginUserController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - auth.controller - loginUserController - start"
    );
    const { password, userName } = req.body;

    let query = { $or: [{ email: userName }, { userName }] };

    const userExist = await userModel
      .findOne(query)
      .select("+password ")
      .lean();

    if (!userExist)
      return next(httpErrors.BadRequest(USER_CONSTANTS.INVALID_EMAIL_PASSWORD));

    // Check if the password is strong
    const isPasswordMatch = await verifyPasswordMethod(
      password,
      userExist.password
    );

    if (!isPasswordMatch)
      return next(httpErrors.BadRequest(USER_CONSTANTS.INVALID_EMAIL_PASSWORD));

    delete userExist.password;
    const token = await createAccessToken(userExist._id, userExist.role);

    logger.info(
      "controller - users - auth.controller - loginUserController - end"
    );

    responseJsonHandler(
      {
        message: USER_CONSTANTS.SUCCESSFULLY_USER_LOGIN,
        data: userExist,
        otherData: {
          accessToken: token,
        },
      },
      res
    );
  } catch (error) {
    logger.error(
      "controller - users - auth.controller - loginUserController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const registerUserController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - auth.controller - registerUserController - start"
    );
    const { name, email, password, userName, gender } = req.body;
    const userNameExist = await userModel.findOne({ userName });
    if (userNameExist) {
      return next(httpErrors.BadRequest(USER_CONSTANTS.USERNAME_ALREADY_EXIST));
    }
    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
      return next(httpErrors.BadRequest(USER_CONSTANTS.USER_ALREADY_EXISTS));
    }

    const newUser = new userModel({
      name,
      email,
      password,
      userName,
      gender,
    });

    await newUser.save();
    delete newUser._doc.password;
    logger.info(
      "controller - users - auth.controller - registerUserController - end"
    );
    responseJsonHandler(
      {
        statusCode: 201,
        message: USER_CONSTANTS.SUCCESSFULLY_USER_CREATED,
        data: newUser,
      },
      res
    );
  } catch (error) {
    logger.error(
      "controller - users - auth.controller - registerUserController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  loginUserController,
  registerUserController,
};
