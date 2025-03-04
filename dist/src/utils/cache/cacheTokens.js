"use strict";
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
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const redis_1 = __importDefault(require("../../system/redis/redis"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || "";
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || "";
class TokenService {
    /**
     * Cache Access Token
     * @params userId User unique Id
     * @params token Issued Access Token
     * @params expiresIn token expiration time in seconds
     */
    static cacheAccessToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = `${this.ACCESS_TOKEN_PREFIX}${userId}`;
                const expiresIn = process.env.REDIS_ACCESS_TOKEN_EXP || 3600;
                yield redis_1.default.set(key, token, 'EX', expiresIn);
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        });
    }
    /**
     * Verifies Access Token
     * @params userId User's unique Identifier
     * @params token JWT token to verify
     */
    static validateAccessToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `${this.ACCESS_TOKEN_PREFIX}${userId}`;
            const cachedToken = yield redis_1.default.get(key);
            if (!cachedToken)
                return false;
            if (cachedToken !== token)
                return false;
            try {
                const decoded = yield jsonwebtoken_1.default.verify(token, JWT_ACCESS_TOKEN_SECRET);
                return decoded;
            }
            catch (e) {
                return false;
            }
        });
    }
    /**
     * Cache Refresh Token
     * @params userId: User's uniqueId
     * @params token: User's refresh token
     * @params expiresIn: Time in seconds for token to expire
     */
    static cacheRefreshToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = `${this.REFRESH_TOKEN_PREFIX}${userId}`;
                const expiresIn = process.env.REDIS_REFRESH_TOKEN_EXP || 3600;
                yield redis_1.default.set(key, token, 'EX', expiresIn);
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Validate Refresh Token
     * @params userId: Unique UserId
     * @params token: Refresh Token
     */
    static validateRefreshToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = `${this.REFRESH_TOKEN_PREFIX}${userId}`;
                const exists = yield redis_1.default.exists(key);
                return exists === 1;
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Invalidate Token
     * @ userId: Unique User Id
     * @ token: Access or Refresh Token
     * @ isRefreshToken: (optional) set to true if token is refresh token
     */
    static invalidateToken(userId_1, token_1) {
        return __awaiter(this, arguments, void 0, function* (userId, token, isRefreshToken = false) {
            const prefix = isRefreshToken ? this.REFRESH_TOKEN_PREFIX : this.ACCESS_TOKEN_PREFIX;
            const key = `${prefix}${userId}`;
            yield redis_1.default.del(key);
        });
    }
}
TokenService.ACCESS_TOKEN_PREFIX = 'access_token';
TokenService.REFRESH_TOKEN_PREFIX = 'refresh_token';
exports.default = TokenService;
