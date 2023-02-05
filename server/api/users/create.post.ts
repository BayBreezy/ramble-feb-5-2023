import { UserModel } from "../../models/User.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // validate
  const { error } = UserSchema.validate(body, {
    abortEarly: true,
    allowUnknown: true,
  });
  // if we get an error, send it back
  if (error) {
    throw createError({
      message: error.message,
    });
  }
  // check if user exist
  const userExist = await UserModel.findOne({ where: { email: body.email } });
  if (userExist) {
    throw createError({
      message: "Sorry, this email is taken",
    });
  }
  // create user
  const user = await UserModel.create(body);
  return user;
});
