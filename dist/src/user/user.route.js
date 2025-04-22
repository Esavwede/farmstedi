"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userRoutes;
const express_1 = require("express");
const passport_1 = __importDefault(require("../config/passport"));
const user_controller_1 = __importDefault(require("./user.controller"));
const validate_1 = __importDefault(require("../middleware/validation/reqSchema/validate"));
const user_schema_1 = require("./user.schema");
const router = (0, express_1.Router)();
function userRoutes(app) {
    try {
        const userController = new user_controller_1.default();
        router.post("/auth/signup", (0, validate_1.default)(user_schema_1.CreateUserSchema), userController.create.bind(userController));
        router.post("/auth/signin", (0, validate_1.default)(user_schema_1.SigninSchema), userController.signin.bind(userController));
        router.post("/auth/signout", userController.signout.bind(userController));
        router.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
        router.get("/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/auth/signin" }), (req, res) => {
            res.redirect("https://www.google.com/");
        });
        router.get("/auth/facebook", passport_1.default.authenticate("facebook", { scope: ["email"] }));
        router.get("/auth/facebook/callback", passport_1.default.authenticate("facebook", { failureRedirect: "/auth/signin" }), (req, res) => {
            res.redirect("https://www.google.com/");
        });
        app.use("/api/v1", router);
    }
    catch (e) {
        console.log("Error Occured While Creating User Routes");
        console.log(e);
    }
}
