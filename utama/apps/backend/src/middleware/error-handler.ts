import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/api-response";
import { HttpException } from "../utils/http-exception";
import { errorLogger, logger } from "@/logger";
import { MessageType } from "@/types/response-type";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (
  err: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpException) {
    logger.error(err.message);

    errorResponse({
      res,
      message: err.message,
      statusCode: err.status,
      data: null,
      type: MessageType.ERROR,
    });
    return;
  }
  if (err instanceof ZodError) {
    const errors = err.issues.map((error) => ({
      field: error.path.join("."),
      message: error.message,
    }));
    logger.error({
      error: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      ip: req.ip,
      body: req.body,
      params: req.params,
      query: req.query,
    });
    errorResponse({
      res,
      message: "Validation error",
      statusCode: StatusCodes.BAD_REQUEST,
      data: errors,
      type: MessageType.ERROR,
    });
    return;
  }
  errorLogger(err, req, res, next);
};
