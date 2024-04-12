"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const user_controller_1 = require("./../src/controllers/user.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const job_controller_1 = require("./../src/controllers/job.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "User": {
        "dataType": "refObject",
        "properties": {
            "firstname": { "dataType": "string", "required": true },
            "lastname": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "uuid": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "undefined" }] },
            "password": { "dataType": "string", "required": true },
            "passwordConfirm": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HttpStatusCode": {
        "dataType": "refEnum",
        "enums": [100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ForesterError": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "message": { "dataType": "string", "required": true },
            "stack": { "dataType": "string" },
            "httpStatusCode": { "ref": "HttpStatusCode", "required": true },
            "isOperational": { "dataType": "boolean", "default": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Job": {
        "dataType": "refObject",
        "properties": {
            "uuid": { "dataType": "string", "required": true },
            "areaPolygon": { "dataType": "array", "array": { "dataType": "array", "array": { "dataType": "array", "array": { "dataType": "double" } } }, "required": true },
            "email": { "dataType": "string", "required": true },
            "status": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime" },
            "updatedAt": { "dataType": "datetime" },
            "lastCompletedRun": { "dataType": "datetime" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JobGetDto": {
        "dataType": "refAlias",
        "type": { "ref": "Job", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Job.areaPolygon-or-email_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "areaPolygon": { "dataType": "array", "array": { "dataType": "array", "array": { "dataType": "array", "array": { "dataType": "double" } } }, "required": true }, "email": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JobCreateDto": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_Job.areaPolygon-or-email_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JobUpdateDto": {
        "dataType": "refAlias",
        "type": { "ref": "Job", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras" });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.get('/users', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.getUsers)), function UserController_getUsers(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new user_controller_1.UserController();
            templateService.apiHandler({
                methodName: 'getUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/users/:uuid', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.getUser)), function UserController_getUser(request, response, next) {
        const args = {
            uuid: { "in": "path", "name": "uuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new user_controller_1.UserController();
            templateService.apiHandler({
                methodName: 'getUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/users', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.createUser)), function UserController_createUser(request, response, next) {
        const args = {
            body: { "in": "body", "name": "body", "required": true, "ref": "User" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new user_controller_1.UserController();
            templateService.apiHandler({
                methodName: 'createUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/users/:uuid', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.updateUser)), function UserController_updateUser(request, response, next) {
        const args = {
            uuid: { "in": "path", "name": "uuid", "required": true, "dataType": "string" },
            body: { "in": "body", "name": "body", "required": true, "ref": "User" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new user_controller_1.UserController();
            templateService.apiHandler({
                methodName: 'updateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/users/:uuid', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.deleteUser)), function UserController_deleteUser(request, response, next) {
        const args = {
            uuid: { "in": "path", "name": "uuid", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new user_controller_1.UserController();
            templateService.apiHandler({
                methodName: 'deleteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/job', ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController)), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController.prototype.createJob)), function JobController_createJob(request, response, next) {
        const args = {
            job: { "in": "body", "name": "job", "required": true, "ref": "JobCreateDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new job_controller_1.JobController();
            templateService.apiHandler({
                methodName: 'createJob',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/job', ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController)), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController.prototype.getJobs)), function JobController_getJobs(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new job_controller_1.JobController();
            templateService.apiHandler({
                methodName: 'getJobs',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/job/:jobId', ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController)), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController.prototype.getJobById)), function JobController_getJobById(request, response, next) {
        const args = {
            jobId: { "in": "path", "name": "jobId", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new job_controller_1.JobController();
            templateService.apiHandler({
                methodName: 'getJobById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/job/:jobId', ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController)), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController.prototype.updateJob)), function JobController_updateJob(request, response, next) {
        const args = {
            jobId: { "in": "query", "name": "jobId", "required": true, "dataType": "string" },
            job: { "in": "body", "name": "job", "required": true, "ref": "JobUpdateDto" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new job_controller_1.JobController();
            templateService.apiHandler({
                methodName: 'updateJob',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/job/:jobId', ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController)), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController.prototype.deleteJob)), function JobController_deleteJob(request, response, next) {
        const args = {
            jobId: { "in": "query", "name": "jobId", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new job_controller_1.JobController();
            templateService.apiHandler({
                methodName: 'deleteJob',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/job/:jobId/publish', ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController)), ...((0, runtime_1.fetchMiddlewares)(job_controller_1.JobController.prototype.publishResults)), function JobController_publishResults(request, response, next) {
        const args = {
            jobId: { "in": "query", "name": "jobId", "required": true, "dataType": "string" },
            results: { "in": "body", "name": "results", "required": true, "dataType": "any" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new job_controller_1.JobController();
            templateService.apiHandler({
                methodName: 'publishResults',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//# sourceMappingURL=routes.js.map