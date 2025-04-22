// Modules
import { config } from "dotenv";
config();
import Redis from "ioredis";

const REDIS_USERNAME: string = process.env.REDIS_USERNAME || "localhost";
const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD || "*******";
const REDIS_HOST: string = process.env.REDIS_HOST || "localhost";
const REDIS_PORT: number = parseInt(process.env.REDIS_PORT as string) || 6379;

var attempt = 0;
const redisClient = new Redis({
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  host: REDIS_HOST,
  port: REDIS_PORT,
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
redisClient.on("reconnecting", (attempt: number) => {
  console.warn(`Redis reconnecting (attempt ${attempt})...`);
  console.log(`Redis reconnecting (attempt ${attempt})...`);
});

// Handle connection close
redisClient.on("end", () => {
  console.log("Redis connection closed.");
  console.log("Redis connection closed.");
});

export default redisClient;
