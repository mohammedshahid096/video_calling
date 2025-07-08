const { celebrate, Joi } = require("celebrate");
const passwordComplexity = require("joi-password-complexity");

// register joi validation
const registerUserValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().label("name"),
    userName: Joi.string().required().min(5).label("userName"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
    gender: Joi.string()
      .valid("male", "female")
      .default("male")
      .label("gender"),
  }),
});

// login joi validation
const loginUserValidation = celebrate({
  body: Joi.object({
    userName: Joi.string().required().label("userName"),
    password: passwordComplexity().required().label("password"),
  }),
});

// updating the  password joi validation
const updatePasswordValidation = celebrate({
  body: Joi.object({
    old_password: passwordComplexity().required().label("Old Password"),
    new_password: passwordComplexity().required().label("New Password"),
  }),
});

module.exports = {
  loginUserValidation,
  registerUserValidation,
  updatePasswordValidation,
};
