import { Express } from "express";
import { Router } from "express";
import passport from "../config/passport";

import UserController from "./user.controller";
import validateRequestSchema from "../middleware/validation/reqSchema/validate";
import { CreateUserSchema, SigninSchema } from "./user.schema";

const router = Router();

export default function userRoutes(app: Express) {
  try {
    const userController = new UserController();

    router.post(
      "/auth/signup",
      validateRequestSchema(CreateUserSchema),
      userController.create.bind(userController)
    );

    router.post(
      "/auth/signin",
      validateRequestSchema(SigninSchema),
      userController.signin.bind(userController)
    );

    router.post("/auth/signout", userController.signout.bind(userController));

    router.get(
      "/auth/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );

    router.get(
      "/auth/google/callback",
      passport.authenticate("google", { failureRedirect: "/auth/signin" }),
      (req, res) => {
        res.redirect("https://www.google.com/");
      }
    );

    router.get(
      "/auth/facebook",
      passport.authenticate("facebook", { scope: ["email"] })
    );

    router.get(
      "/auth/facebook/callback",
      passport.authenticate("facebook", { failureRedirect: "/auth/signin" }),
      (req, res) => {
        res.redirect("https://www.google.com/");
      }
    );

    app.use("/api/v1", router);
  } catch (e: any) {
    console.log("Error Occured While Creating User Routes");
    console.log(e);
  }
}
