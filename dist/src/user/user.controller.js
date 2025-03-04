"use strict";
/*** MODULES ***/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Model
const user_repo_1 = __importDefault(require("./user.repo"));
const user_service_1 = __importDefault(require("./user.service"));
class UserController {
    constructor() {
        const userRepo = new user_repo_1.default();
        this.userService = new user_service_1.default(userRepo);
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.create(req.body);
                res.status(201).json({ success: true, msg: "signup successful" });
                return;
            }
            catch (err) {
                next(err);
            }
        });
    }
    signin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const data = yield this.userService.signin(email, password);
                res.status(200).json({ success: true, data });
            }
            catch (e) {
                next(e);
            }
        });
    }
    signout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, accessToken, refreshToken } = req.body;
                yield this.userService.signout(userId, accessToken, refreshToken);
                res.status(200).json({ success: true, msg: "signout successful!" });
                return;
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = UserController;
