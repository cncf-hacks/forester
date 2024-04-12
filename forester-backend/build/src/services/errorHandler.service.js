"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const foresterError_1 = require("../exceptions/foresterError");
const axios_1 = require("axios");
class ErrorHandlerService {
    isTrustedError(error) {
        if (error instanceof foresterError_1.ForesterError) {
            return error.isOperational;
        }
        return false;
    }
    handleError(error, response) {
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error, response);
        }
        else {
            this.handleCriticalError(error, response);
        }
    }
    handleTrustedError(error, response) {
        response.status(error.httpStatusCode).json({
            name: error.name,
            description: error.message,
        });
    }
    handleCriticalError(error, response) {
        console.error(error);
        if (response) {
            response.status(axios_1.HttpStatusCode.InternalServerError).json({
                name: "Internal Server Error",
                description: "An unexpected error occurred",
            });
        }
    }
}
exports.default = ErrorHandlerService;
exports.errorHandler = new ErrorHandlerService();
//# sourceMappingURL=errorHandler.service.js.map