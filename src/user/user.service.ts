/*** MODULES ***/

// Config
import { config } from "dotenv";
config();

// Error Modules
import { BadRequestError } from "../utils/errors/server/400Error";
import { UnauthorizedError } from "../utils/errors/server/401Error";

// Model
import { CreateUser_REQ_DTO } from "./user.dto";
import UserRepo from "./user.repo";

// Tokens
import TokenService from "../utils/cache/cacheTokens";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt/jwt";

export default class UserService {
  constructor(private userRepo: UserRepo) {}

  async create(user: CreateUser_REQ_DTO) {
    try {
      const userExists = await this.checkUserExistsWithEmail(user.email);

      if (userExists) throw new BadRequestError("email registered already");

      await this.userRepo.create(user);
    } catch (e: any) {
      throw e;
    }
  }

  async checkUserExistsWithEmail(email: string): Promise<{} | null> {
    try {
      return await this.userRepo.checkUserExistsWithEmail(email);
    } catch (e: any) {
      console.log("Service: Check User Exists With Email ");
      console.log(e);
      throw e;
    }
  }

  async signin(email: string, password: string) {
    try {
      const user = await this.userRepo.find(email);

      // Return 401 error if user not found
      if (!user) throw new UnauthorizedError("check signin details");

      // Validate User Password
      const passwordValid = await user.comparePassword(password);
      if (!passwordValid) throw new UnauthorizedError("check signing details");

      // Extract User Data
      const { _id, firstname, lastname } = user;
      const userData = { _id, firstname, lastname };

      // Generate User Tokens
      const accessToken = generateAccessToken(userData);
      const refreshToken = generateRefreshToken(userData);

      // Store User Tokens in Cache
      await TokenService.cacheAccessToken(_id as string, accessToken);
      await TokenService.cacheRefreshToken(_id as string, refreshToken);

      return { userData, tokens: { accessToken, refreshToken } };
    } catch (e: any) {
      console.log("Signin Service");
      console.log(e);
      throw e;
    }
  }

  async signout(userId: string, accessToken: string, refreshToken: string) {
    try {
      // Remove Tokens From Redis Cache
      await TokenService.invalidateToken(userId, accessToken, false);
      await TokenService.invalidateToken(userId, refreshToken, true);
    } catch (e: any) {
      throw e;
    }
  }
}
