"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForesterError = void 0;
const axios_1 = require("axios");
class ForesterError extends Error {
    constructor(args) {
        super(args.description);
        this.isOperational = true;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = args.name || "ForesterError";
        this.httpStatusCode = args.httpStatusCode || axios_1.HttpStatusCode.InternalServerError;
        this.isOperational = args.isOperational !== undefined ? args.isOperational : true;
        Error.captureStackTrace(this);
    }
}
exports.ForesterError = ForesterError;
//# sourceMappingURL=foresterError.js.map