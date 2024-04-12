"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Process environment context from NODE_ENV
const node_env = (_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toLowerCase();
if (!node_env) {
    console.log("No env set, variables should be set at load time");
}
else {
    if (node_env === "local") {
        console.log("Using local environment");
    }
    // Load environment variables from .env.<NODE_ENV>
    const ret = dotenv_1.default.config({ path: ".env." + node_env });
    if (ret.error) {
        console.error("Error loading .env." + node_env);
        throw ret.error;
    }
}
// Config loaded from .env.<NODE_ENV>
exports.config = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: parseInt(process.env.SMTP_PORT),
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    MONGO_URI: process.env.MONGO_URI,
};
//# sourceMappingURL=startup.js.map