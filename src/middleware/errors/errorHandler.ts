import { Request, Response } from "express";
import { AnyAppError } from "./anyAppError";
import { NextFunction } from "express-serve-static-core";

export default function AppErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const e = err as any as AnyAppError;

  const errorCode = e.statusCode;

  console.log("determining error");

  switch (errorCode) {
    case 400:
      console.log("loggerrrr");
      res.status(400).json({ success: false, msg: e.message });
      break;

    case 401:
      res.status(401).json({ success: false, msg: e.message });
      break;

    case 403:
      res.status(403).json({ success: false, msg: e.message });
      break;

    case 404:
      res.status(404).json({ success: false, msg: e.message });
      break;

    case 409:
      res.status(409).json({ success: false, msg: e.message });
      break;

    case 500:
      res.status(500).json({ success: false, msg: e.message });
      break;

    default:
      console.log("Untracked Error Type");
      res.status(500).json({ success: false, msg: "server error" });
  }
}
