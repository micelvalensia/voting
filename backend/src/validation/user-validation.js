import Joi from "joi";

export const userRegisterValidation = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});

export const userLoginValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(10).required(),
});
