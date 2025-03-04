"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules 
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const ioredis_1 = __importDefault(require("ioredis"));
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379;
var attempt = 0;
const redisClient = new ioredis_1.default({
    host: REDIS_HOST,
    port: REDIS_PORT
});
// Log successful connection
redisClient.on("connect", () => {
    console.log("Redis connected successfully 🚀");
});
// Handle connection errors
redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
    console.log("Redis connection error:", err);
});
// Handle reconnection attempts
redisClient.on("reconnecting", (attempt) => {
    console.warn(`Redis reconnecting (attempt ${attempt})...`);
    console.log(`Redis reconnecting (attempt ${attempt})...`);
});
// Handle connection close
redisClient.on("end", () => {
    console.log("Redis connection closed.");
    console.log("Redis connection closed.");
});
exports.default = redisClient;
