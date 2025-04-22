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
// Config
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Error Modules
const _400Error_1 = require("../utils/errors/server/400Error");
const _401Error_1 = require("../utils/errors/server/401Error");
// Tokens
const cacheTokens_1 = __importDefault(require("../utils/cache/cacheTokens"));
const jwt_1 = require("../utils/jwt/jwt");
class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.checkUserExistsWithEmail(user.email);
                if (userExists)
                    throw new _400Error_1.BadRequestError("email registered already");
                yield this.userRepo.create(user);
            }
            catch (e) {
                throw e;
            }
        });
    }
    checkUserExistsWithEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepo.checkUserExistsWithEmail(email);
            }
            catch (e) {
                console.log("Service: Check User Exists With Email ");
                console.log(e);
                throw e;
            }
        });
    }
    signin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepo.find(email);
                // Return 401 error if user not found
                if (!user)
                    throw new _401Error_1.UnauthorizedError("check signin details");
                // Validate User Password
                const passwordValid = yield user.comparePassword(password);
                if (!passwordValid)
                    throw new _401Error_1.UnauthorizedError("check signing details");
                // Extract User Data
                const { _id, firstname, lastname } = user;
                const userData = { _id, firstname, lastname };
                // Generate User Tokens
                const accessToken = (0, jwt_1.generateAccessToken)(userData);
                const refreshToken = (0, jwt_1.generateRefreshToken)(userData);
                // Store User Tokens in Cache
                yield cacheTokens_1.default.cacheAccessToken(_id, accessToken);
                yield cacheTokens_1.default.cacheRefreshToken(_id, refreshToken);
                return { userData, tokens: { accessToken, refreshToken } };
            }
            catch (e) {
                console.log("Signin Service");
                console.log(e);
                throw e;
            }
        });
    }
    signout(userId, accessToken, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Remove Tokens From Redis Cache
                yield cacheTokens_1.default.invalidateToken(userId, accessToken, false);
                yield cacheTokens_1.default.invalidateToken(userId, refreshToken, true);
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.default = UserService;
