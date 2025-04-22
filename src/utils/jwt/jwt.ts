import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";

export function generateAccessToken(data: {}) {
  try {
    return jwt.sign(data, process.env.JWT_ACCESS_TOKEN_SECRET || "default", {
      expiresIn: "1h",
    });
  } catch (e: any) {
    console.log("Create Access Token Error");
    console.log(e);
    throw e;
  }
}

export function generateRefreshToken(data: {}) {
  try {
    return jwt.sign(data, process.env.JWT_REFRESH_TOKEN_SECRET || "default", {
      expiresIn: "1d",
    });
  } catch (e: any) {
    console.log("Create Refresh Token Error");
    console.log(e);
    throw e;
  }
}
