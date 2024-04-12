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
const axios_1 = __importDefault(require("axios"));
const foresterError_1 = require("../exceptions/foresterError");
class KeycloakService {
    constructor() {
        this.getNewClientAccessToken = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.post(`${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`, {
                client_id: process.env.KEYCLOAK_CLIENT_ID,
                client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
                grant_type: "client_credentials",
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            return response.data.access_token;
        });
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getNewClientAccessToken();
            const response = yield axios_1.default.get(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        });
        this.getUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getNewClientAccessToken();
            const response = yield axios_1.default.get(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        });
        this.createUser = (newUser) => __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getNewClientAccessToken();
            const response = yield axios_1.default.post(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`, {
                id: newUser.uuid,
                firstName: newUser.firstname,
                lastName: newUser.lastname,
                username: newUser.email.split("@")[0],
                enabled: true,
                credentials: [
                    {
                        type: "password",
                        value: newUser.password,
                        temporary: false,
                    },
                ],
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.status !== 201) {
                throw new foresterError_1.ForesterError({
                    httpStatusCode: response.status,
                    description: response.data.errorMessage,
                    isOperational: true,
                });
            }
            return response.headers.location.split("/").pop();
        });
        this.updateUser = (id, updatedUser) => __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getNewClientAccessToken();
            const response = yield axios_1.default.put(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${id}`, {
                id: updatedUser.uuid,
                firstName: updatedUser.firstname,
                lastName: updatedUser.lastname,
                username: updatedUser.email.split("@")[0],
                email: updatedUser.email,
                enabled: true,
                credentials: [
                    {
                        type: "password",
                        value: updatedUser.password,
                        temporary: false,
                    },
                ],
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.status !== 204) {
                throw new foresterError_1.ForesterError({
                    httpStatusCode: response.status,
                    description: response.data.errorMessage,
                    isOperational: true,
                });
            }
            return response.data;
        });
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getNewClientAccessToken();
            const response = yield axios_1.default.delete(`${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.status !== 204) {
                throw new foresterError_1.ForesterError({
                    httpStatusCode: response.status,
                    description: response.data.errorMessage,
                    isOperational: true,
                });
            }
            return response.data;
        });
    }
}
exports.default = KeycloakService;
//# sourceMappingURL=keycloak.service.js.map