import { UserModel } from "../../models/User.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // validate
  const { error } = LoginSchema.validate(body, {
    abortEarly: true,
    allowUnknown: true,
  });
  // if we get an error, send it back
  if (error) {
    throw createError({
      message: error.message,
    });
  }

  // find the user
  const user = await UserModel.findOne({ where: { email: body.email } });
  // error if user does not exist
  if (!user) {
    throw createError({
      message: "User not found",
    });
  }

  // create cookie
  setCookie(event, cookieName, user.email, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  return user;
});
