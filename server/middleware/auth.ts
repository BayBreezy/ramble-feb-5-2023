import { UserModel } from "./../models/User.model";
export default defineEventHandler(async (event) => {
  // get the cookie
  let cookie = getCookie(event, cookieName);
  if (cookie) {
    // find the user
    const user = await UserModel.findOne({ where: { email: cookie } });
    if (user) {
      event.context.user = { user };
    }
  }
});
