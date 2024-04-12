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
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const foresterError_1 = require("../exceptions/foresterError");
const job_model_1 = require("../models/job.model");
const crypto_1 = require("crypto");
class JobService {
    createJob(job) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uuid = (0, crypto_1.randomUUID)();
                const newJob = yield job_model_1.JobModel.create(Object.assign(Object.assign({}, job), { uuid: uuid, status: "created" }));
                return newJob;
            }
            catch (error) {
                if (error.code === 11000) {
                    throw new foresterError_1.ForesterError({
                        description: "Job with this ID already exists",
                        httpStatusCode: axios_1.HttpStatusCode.BadRequest,
                    });
                }
                throw new foresterError_1.ForesterError({
                    description: "Error creating job",
                    httpStatusCode: axios_1.HttpStatusCode.InternalServerError,
                });
            }
        });
    }
    getJobById(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield job_model_1.JobModel.findOne({ uuid: jobId });
        });
    }
    getJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield job_model_1.JobModel.find();
        });
    }
    updateJob(jobId, job) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield job_model_1.JobModel.findOneAndUpdate({ uuid: jobId }, job, { new: false });
        });
    }
    deleteJob(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield job_model_1.JobModel.findOneAndDelete({ uuid: jobId });
        });
    }
}
exports.default = JobService;
//# sourceMappingURL=job.service.js.map