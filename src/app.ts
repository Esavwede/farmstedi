import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import routes from "./routes";
import AppErrorHandler from "./middleware/errors/errorHandler";
import session from "express-session";
import passport from "./config/passport";

// Security
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

const app = express();

// Security
app.use(helmet());

app.use(
  cors({
    origin: ["localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (req: Request, res: Response, next: NextFunction, options) => {
      res.status(429).json({
        success: false,
        msg: ` too many requests wait for ${Math.round(
          options.windowMs / 1000
        )} seconds to continue `,
      });
    },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json()); // For parsing JSON request bodies
app.use(express.static(path.join(path.resolve(), "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ROUTES
routes(app);

// App Error Handler
app.use(AppErrorHandler);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(400).json({ success: false, msg: "Route Not Found" });
});

export default app;
