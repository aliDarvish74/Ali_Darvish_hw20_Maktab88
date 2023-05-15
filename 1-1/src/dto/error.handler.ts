import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ResponseDto from "./response.dto";

export class AppError {
  constructor(public statusCode: number, public message: string) {}
}

export const errorHandler: ErrorRequestHandler = (
  err: AppError | any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json(new ResponseDto('fail',err.message));
  } else {
    res.status(500).json(new ResponseDto('error','Internal Server Error'));
  }
};
