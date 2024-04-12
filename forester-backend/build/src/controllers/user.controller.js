"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const user_service_1 = __importDefault(require("../services/user.service"));
const axios_1 = require("axios");
let UserController = class UserController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.userService = new user_service_1.default();
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userService.getUsers();
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUser(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userService.getUser(uuid);
            }
            catch (error) {
                throw error;
            }
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.createUser(body);
                return "Created user account successfully: " + response.uuid;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUser(uuid, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.updateUser(uuid, body);
                return "Updated user account successfully";
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteUser(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.deleteUser(uuid);
                return "Deleted user account successfully";
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Get)("/"),
    (0, tsoa_1.SuccessResponse)("200", "OK"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, tsoa_1.Get)("{uuid}"),
    (0, tsoa_1.SuccessResponse)("200", "OK"),
    (0, tsoa_1.Response)(axios_1.HttpStatusCode.NotFound, "User not found"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    (0, tsoa_1.SuccessResponse)("201", "Created"),
    (0, tsoa_1.Response)(axios_1.HttpStatusCode.BadRequest, "Bad Request"),
    (0, tsoa_1.Response)(axios_1.HttpStatusCode.Conflict, "User already exists"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Put)("{uuid}"),
    (0, tsoa_1.SuccessResponse)("200", "Updated"),
    (0, tsoa_1.Response)(axios_1.HttpStatusCode.BadRequest, "Bad Request"),
    (0, tsoa_1.Response)(axios_1.HttpStatusCode.NotFound, "User not found"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, tsoa_1.Delete)("{uuid}"),
    (0, tsoa_1.SuccessResponse)("200", "Deleted"),
    (0, tsoa_1.Response)(axios_1.HttpStatusCode.NotFound, "User not found"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)("users"),
    (0, tsoa_1.Tags)("User Controller Routes")
], UserController);
//# sourceMappingURL=user.controller.js.map