import Joi from "joi";

const userSignupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phone:
    Joi.string()
    .required(),
  gender: Joi.string().valid("male", "female", "other").required(),
});

export { userSignupSchema };
