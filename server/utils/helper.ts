import { H3Event } from "h3";
import Joi from "joi";

export const UserSchema = Joi.object({
  firstName: Joi.string().max(50).min(1).required(),
  lastName: Joi.string().max(50).min(1).required(),
  email: Joi.string().email().required(),
});
export const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const cookieName = "ramble-user-cookie";

export const checkUser = (event: H3Event) => {
  return Boolean(event.context?.user);
};
