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
exports.JobController = void 0;
const axios_1 = require("axios");
const foresterError_1 = require("../exceptions/foresterError");
const tsoa_1 = require("tsoa");
const job_service_1 = __importDefault(require("../services/job.service"));
const email_service_1 = __importDefault(require("../services/email.service"));
const startup_1 = require("../utils/startup");
let JobController = class JobController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.jobService = new job_service_1.default();
        this.emailService = new email_service_1.default();
    }
    createJob(job) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJob = yield this.jobService.createJob(job);
            return newJob;
        });
    }
    getJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jobService.getJobs();
        });
    }
    getJobById(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jobService.getJobById(jobId);
        });
    }
    updateJob(jobId, job) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jobService.updateJob(jobId, job);
        });
    }
    deleteJob(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jobService.deleteJob(jobId);
        });
    }
    publishResults(jobId, results) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.jobService.getJobById(jobId);
            if (job.status !== "running") {
                throw new foresterError_1.ForesterError({
                    description: "Job is not running",
                    httpStatusCode: axios_1.HttpStatusCode.BadRequest,
                });
            }
            job.lastCompletedRun = new Date();
            yield this.jobService.updateJob(jobId, job);
            //TODO encode results according to new model structure
            return this.emailService.sendMail({
                subject: "Job Completed",
                from: startup_1.config.SMTP_USER,
                to: job.email,
                text: `Your job with id ${job.uuid} has completed on ${job.lastCompletedRun}.`,
            });
        });
    }
};
exports.JobController = JobController;
__decorate([
    (0, tsoa_1.Post)("/"),
    (0, tsoa_1.SuccessResponse)("200", "OK"),
    (0, tsoa_1.Response)(axios_1.HttpStatusCode.BadRequest, "Bad Request"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createJob", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    (0, tsoa_1.SuccessResponse)("200", "OK"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getJobs", null);
__decorate([
    (0, tsoa_1.Get)("/{jobId}"),
    (0, tsoa_1.SuccessResponse)("200", "OK"),
    (0, tsoa_1.Response)(axios_1.HttpStatusCode.NotFound, "Job Not Found"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getJobById", null);
__decorate([
    (0, tsoa_1.Put)("/{jobId}"),
    (0, tsoa_1.SuccessResponse)("200", "OK"),
    (0, tsoa_1.Response)(axios_1.HttpStatusCode.NotFound, "Job Not Found"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "updateJob", null);
__decorate([
    (0, tsoa_1.Delete)("/{jobId}"),
    (0, tsoa_1.SuccessResponse)("200", "OK"),
    (0, tsoa_1.Response)(axios_1.HttpStatusCode.NotFound, "Job Not Found"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "deleteJob", null);
__decorate([
    (0, tsoa_1.Post)("/{jobId}/publish"),
    (0, tsoa_1.SuccessResponse)("200", "OK"),
    (0, tsoa_1.Response)(axios_1.HttpStatusCode.NotFound, "Job Not Found"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "publishResults", null);
exports.JobController = JobController = __decorate([
    (0, tsoa_1.Route)("job"),
    (0, tsoa_1.Tags)("Job Controller Routes")
], JobController);
//# sourceMappingURL=job.controller.js.map