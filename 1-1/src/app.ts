import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { AppError, errorHandler } from "./dto/error.handler";
import { connectToDatabase } from "./database/database.connection";

import apiRouter from "./routes/api.route";

const app: Express = express();

connectToDatabase();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (_req: Request, _res: Response, next: NextFunction) {
  next(new AppError(404, "Not found"));
});

// error handler
app.use(errorHandler);

export default app;
