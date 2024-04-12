"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const startup_1 = require("../utils/startup");
class EmailService {
    constructor() {
        this.createConnection();
    }
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            this.transporter = nodemailer_1.default.createTransport({
                host: startup_1.config.SMTP_HOST,
                port: startup_1.config.SMTP_PORT,
                secure: false,
                auth: {
                    user: startup_1.config.SMTP_USER,
                    pass: startup_1.config.SMTP_PASS,
                },
            });
            this.transporter.verify((error, success) => {
                if (error) {
                    console.error("Error connecting to SMTP server: %s", error);
                }
                else {
                    console.log("Connected to SMTP server: %s", success);
                }
            });
        });
    }
    sendMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transporter
                .sendMail(options)
                .then((info) => {
                console.log("Message sent: %s", info.messageId);
                return info;
            })
                .catch((error) => {
                console.error("Error sending email: %s", error);
                throw error;
            });
        });
    }
}
exports.default = EmailService;
//# sourceMappingURL=email.service.js.map