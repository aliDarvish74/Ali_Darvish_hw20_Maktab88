"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
const response_dto_1 = __importDefault(require("./response.dto"));
class AppError {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.AppError = AppError;
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json(new response_dto_1.default('fail', err.message));
    }
    else {
        res.status(500).json(new response_dto_1.default('error', 'Internal Server Error'));
    }
};
exports.errorHandler = errorHandler;
