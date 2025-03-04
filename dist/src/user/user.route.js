"use strict";
/*** MODULES ***/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userRoutes;
const express_1 = require("express");
// Controller
const user_controller_1 = __importDefault(require("./user.controller"));
const validate_1 = __importDefault(require("../middleware/validation/reqSchema/validate"));
const user_schema_1 = require("./user.schema");
const router = (0, express_1.Router)();
function userRoutes(app) {
    try {
        const userController = new user_controller_1.default();
        // User Signup 
        router.post("/auth/signup", (0, validate_1.default)(user_schema_1.CreateUserSchema), userController.create.bind(userController));
        // User Signin
        router.post("/auth/signin", (0, validate_1.default)(user_schema_1.SigninSchema), userController.signin.bind(userController));
        // User Signin
        router.post("/auth/signout", userController.signout.bind(userController));
        app.use('/api/v1', router);
    }
    catch (e) {
        console.log("Error Occured While Creating User Routes");
        console.log(e);
    }
}
