"use strict";
/** MODULES */
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
// User 
const _500Error_1 = require("../utils/errors/server/500Error");
const user_model_1 = __importDefault(require("./user.model"));
// User Repository
class UserRepo {
    constructor() {
    }
    // Create A New User 
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_model_1.default.create(user);
            }
            catch (e) {
                console.log("User Repo: Could Not Create New User");
                console.log(e);
                throw new _500Error_1.ServerError("Server Error");
            }
        });
    }
    // Checks If an email exists in the Database 
    checkUserExistsWithEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findOne({ email }, { _id: 1 });
            }
            catch (e) {
                console.log("Repo: Check Email Exists");
                console.log(e);
                throw e;
            }
        });
    }
    find(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({ email });
                return user;
            }
            catch (e) {
                console.log("User Repo");
                console.log(e);
                throw e;
            }
        });
    }
}
exports.default = UserRepo;
