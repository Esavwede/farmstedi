/** MODULES */

// User
import { ServerError } from "../utils/errors/server/500Error";
import { CreateUser_REQ_DTO } from "./user.dto";
import User, { IUser } from "./user.model";

// User Repository
export default class UserRepo {
  constructor() {}

  // Create A New User
  async create(user: CreateUser_REQ_DTO) {
    try {
      await User.create(user);
      console.log("USER_REPO: New User Created");
    } catch (e: any) {
      console.log("User Repo: Could Not Create New User");
      console.log(e);
      throw new ServerError("Server Error");
    }
  }

  // Checks If an email exists in the Database
  async checkUserExistsWithEmail(email: string): Promise<{} | null> {
    try {
      return await User.findOne({ email }, { _id: 1 });
    } catch (e: any) {
      console.log("Repo: Check Email Exists");
      console.log(e);
      throw e;
    }
  }

  async find(email: string): Promise<null | IUser> {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (e: any) {
      console.log("User Repo");
      console.log(e);
      throw e;
    }
  }
}
