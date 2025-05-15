import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import compression from "compression";
import routes from "./routes";
import AppErrorHandler from "./middleware/errors/errorHandler";
import session from "express-session";
import passport from "./config/passport";

// Security
import helmet from "helmet";
import cors from "cors";
import { swaggerInit } from "./docs/init/swagger";

const app = express();

// Security
app.use(helmet());
app.use(cors());

// optimization
app.use(compression());

// docs
swaggerInit(app);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(400).json({ success: false, msg: "Route Not Found" });
});

// App Error Handler
app.use(AppErrorHandler);

export default app;
