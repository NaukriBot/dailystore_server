import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { Response } from "express";
import { CustomException } from "./custom-exception.filter";
import { MongoError } from "mongodb";
interface ErrorMessage {
  statusCode: number;
  message: string;
  error?: unknown;
}
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: ErrorMessage = {
      statusCode: status,
      message: "Internal server error",
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = {
        statusCode: status,
        message: "Schema validation failed",
        error: exception.message,
      };
    }

    if (exception instanceof MongoError) {
      const status = 400;
      message = {
        statusCode: status,
        message: "Schema validation failed",
        error: exception.message,
      };
    }

    if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = {
        statusCode: status,
        message: "Resource not found",
        error: exception.message,
      };
    }

    if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
      message = {
        statusCode: status,
        message: "Bad request",
        error: exception.message,
      };
    }

    if (exception instanceof CustomException) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = {
        statusCode: status,
        message: "Invalid Data",
        error: exception.message,
      };
    }

    response.status(status).json({
      status: "error",
      ...message,
    });
  }
}
