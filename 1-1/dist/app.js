"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const error_handler_1 = require("./dto/error.handler");
const database_connection_1 = require("./database/database.connection");
const api_route_1 = __importDefault(require("./routes/api.route"));
const app = (0, express_1.default)();
(0, database_connection_1.connectToDatabase)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use("/api", api_route_1.default);
// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next(new error_handler_1.AppError(404, "Not found"));
});
// error handler
app.use(error_handler_1.errorHandler);
exports.default = app;
