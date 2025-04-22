"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(data) {
    try {
        return jsonwebtoken_1.default.sign(data, process.env.JWT_ACCESS_TOKEN_SECRET || "default", {
            expiresIn: "1h",
        });
    }
    catch (e) {
        console.log("Create Access Token Error");
        console.log(e);
        throw e;
    }
}
function generateRefreshToken(data) {
    try {
        return jsonwebtoken_1.default.sign(data, process.env.JWT_REFRESH_TOKEN_SECRET || "default", {
            expiresIn: "1d",
        });
    }
    catch (e) {
        console.log("Create Refresh Token Error");
        console.log(e);
        throw e;
    }
}
