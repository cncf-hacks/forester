import { Job } from "../models/job.model";

export type JobCreateDto = Pick<Job, "areaPolygon" | "email">;
export type JobUpdateDto = Job;
export type JobGetDto = Job;
