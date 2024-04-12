import { Response } from "express";
import { ForesterError } from "../exceptions/foresterError";
import { HttpStatusCode } from "axios";

export default class ErrorHandlerService {
  private isTrustedError(error: Error): boolean {
    if (error instanceof ForesterError) {
      return error.isOperational;
    }

    return false;
  }

  public handleError(error: Error | ForesterError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as ForesterError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }

  private handleTrustedError(error: ForesterError, response: Response): void {
    response.status(error.httpStatusCode).json({
      name: error.name,
      description: error.message,
    });
  }

  private handleCriticalError(error: Error, response?: Response): void {
    console.error(error);
    if (response) {
      response.status(HttpStatusCode.InternalServerError).json({
        name: "Internal Server Error",
        description: "An unexpected error occurred",
      });
    }
  }
}

export const errorHandler = new ErrorHandlerService();
