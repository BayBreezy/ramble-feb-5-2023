import { UserModel } from "../../models/User.model";

export default defineEventHandler(async (event) => {
  const users = await UserModel.findAll();
  return users;
});
