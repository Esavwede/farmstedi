/*** MODULES ***/

// Model
import UserRepo from "./user.repo";
import { CreateUserRequestSchema, SigninRequestSchema } from "./user.schema";
import UserService from "./user.service";

// Server
import { NextFunction, Request, Response } from "express";

export default class UserController {
  private userService: UserService;

  constructor() {
    const userRepo = new UserRepo();
    this.userService = new UserService(userRepo);
  }

  async create(
    req: Request<{}, {}, CreateUserRequestSchema["body"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      await this.userService.create(req.body);
      res.status(201).json({ success: true, msg: "signup successful" });
      return;
    } catch (err: any) {
      next(err);
    }
  }

  async signin(
    req: Request<{}, {}, SigninRequestSchema["body"]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const data = await this.userService.signin(email, password);
      res.status(200).json({ success: true, data });
    } catch (e: any) {
      next(e);
    }
  }

  async signout(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, accessToken, refreshToken } = req.body;
      await this.userService.signout(userId, accessToken, refreshToken);
      res.status(200).json({ success: true, msg: "signout successful!" });
      return;
    } catch (e: any) {
      next(e);
    }
  }
}
