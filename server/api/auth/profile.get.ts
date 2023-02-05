import { UserModel } from "../../models/User.model";

export default defineEventHandler(async (event) => {
  const userAuth = checkUser(event);
  if (!userAuth)
    throw createError({ message: "Unauthorized", statusCode: 401 });

  // find the user
  const user = await UserModel.findOne({
    where: { email: event.context?.user?.user.email },
  });
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
