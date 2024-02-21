"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    message;
    statusCode;
    status;
    constructor(message, statusCode = 500) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
