"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const mongoose_1 = require("mongoose");
const JobSchema = new mongoose_1.Schema({
    uuid: { type: String, required: true, unique: true },
    areaPolygon: { type: mongoose_1.Schema.Types.Mixed, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, required: true },
    lastCompletedRun: { type: Date, required: false },
}, {
    timestamps: true,
});
exports.JobModel = (0, mongoose_1.model)("Job", JobSchema);
//# sourceMappingURL=job.model.js.map