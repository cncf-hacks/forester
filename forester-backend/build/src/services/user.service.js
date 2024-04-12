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
const user_model_1 = require("../models/user.model");
const foresterError_1 = require("../exceptions/foresterError");
const keycloak_service_1 = __importDefault(require("./keycloak.service"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = require("axios");
dotenv_1.default.config();
const keycloakUrl = process.env.KEYCLOAK_BASE_URL;
const keycloakToken = process.env.KEYCLOAK_TOKEN;
class UserService {
    constructor() {
        this.keycloakService = new keycloak_service_1.default();
        this.emailRegex = /\S+@\S+\.\S+/;
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.find().exec();
        });
        this.getUser = (uuid) => __awaiter(this, void 0, void 0, function* () {
            // check if user exists
            const response = yield user_model_1.UserModel.find({ uuid }).exec();
            if (response.length === 0) {
                throw new foresterError_1.ForesterError({
                    httpStatusCode: axios_1.HttpStatusCode.NotFound,
                    description: "User not found",
                    isOperational: true,
                });
            }
            return response[0];
        });
        this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            // check if user exists
            const response = yield user_model_1.UserModel.find({ email }).exec();
            if (response.length === 0) {
                throw new foresterError_1.ForesterError({
                    httpStatusCode: axios_1.HttpStatusCode.NotFound,
                    description: "User not found",
                    isOperational: true,
                });
            }
            return response[0];
        });
        this.createUser = (newUser) => __awaiter(this, void 0, void 0, function* () {
            // check if email is of valid format
            if (!this.emailRegex.test(newUser.email) || newUser.email == null) {
                throw new foresterError_1.ForesterError({
                    httpStatusCode: axios_1.HttpStatusCode.BadRequest,
                    description: "Email is not of valid format",
                    isOperational: true,
                });
            }
            // check if password matches password confirmation
            if (newUser.password !== newUser.passwordConfirm) {
                throw new foresterError_1.ForesterError({
                    httpStatusCode: axios_1.HttpStatusCode.BadRequest,
                    description: "Password does not match password confirmation",
                    isOperational: true,
                });
            }
            // check if user already exists by checking if error is thrown when trying to get user
            try {
                yield this.getUserByEmail(newUser.email);
                throw new foresterError_1.ForesterError({
                    httpStatusCode: axios_1.HttpStatusCode.Conflict,
                    description: "User already exists",
                    isOperational: true,
                });
            }
            catch (error) {
                // error thrown, check if it is a 404 error
                if (error instanceof foresterError_1.ForesterError) {
                    // if it is a 404 error, create the user
                    if (error.httpStatusCode === axios_1.HttpStatusCode.NotFound) {
                        // create user in keycloak and get uuid (keycloak is literally trash)
                        newUser.uuid = yield this.keycloakService.createUser(newUser);
                        // create user in database
                        const response = yield user_model_1.UserModel.create(newUser);
                        return response;
                    }
                    else {
                        throw error;
                    }
                }
                else {
                    throw error;
                }
            }
        });
        this.updateUser = (uuid, updatedUser) => __awaiter(this, void 0, void 0, function* () {
            // check if user exists
            yield this.getUser(uuid);
            // check input
            if (!this.emailRegex.test(updatedUser.email) || updatedUser.email == null) {
                throw new foresterError_1.ForesterError({
                    httpStatusCode: axios_1.HttpStatusCode.BadRequest,
                    description: "Email is not of valid format",
                    isOperational: true,
                });
            }
            // check if password matches password confirmation
            if (updatedUser.password !== updatedUser.passwordConfirm) {
                throw new foresterError_1.ForesterError({
                    httpStatusCode: axios_1.HttpStatusCode.BadRequest,
                    description: "Password does not match password confirmation",
                    isOperational: true,
                });
            }
            // update user in keycloak, then in database
            yield this.keycloakService.updateUser(uuid, updatedUser);
            const response = yield user_model_1.UserModel.updateOne({ uuid }, updatedUser);
            return response;
        });
        this.deleteUser = (uuid) => __awaiter(this, void 0, void 0, function* () {
            // check if user exists
            yield this.getUser(uuid);
            // delete user in keycloak, then in database
            yield this.keycloakService.deleteUser(uuid);
            const response = yield user_model_1.UserModel.findOneAndDelete({ uuid });
            return response;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map