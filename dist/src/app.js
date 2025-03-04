"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./middleware/errors/errorHandler"));
// Security
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Security 
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: ['localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization', 'Content-Type']
}));
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (req, res, next, options) => {
        res.status(429).json({ success: false, msg: ` too many requests wait for ${Math.round(options.windowMs / 1000)} seconds to continue ` });
    }
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json()); // For parsing JSON request bodies
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), 'public')));
// ROUTES 
(0, routes_1.default)(app);
// App Error Handler 
app.use(errorHandler_1.default);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(400).json({ success: false, msg: "Route Not Found" });
});
exports.default = app;
