"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotPermittedError = void 0;
class NotPermittedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 403;
        this.message = message;
        // Settings 
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
exports.NotPermittedError = NotPermittedError;
