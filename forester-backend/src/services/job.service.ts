import { HttpStatusCode } from "axios";
import { ForesterError } from "../exceptions/foresterError";
import { Job, JobModel } from "../models/job.model";
import { JobCreateDto, JobUpdateDto } from "../controllers/job.types";
import { randomUUID } from "crypto";

export default class JobService {
  async createJob(job: JobCreateDto): Promise<Job> {
    try {
      const uuid = randomUUID();
      return await JobModel.create({
        ...job,
        uuid: uuid,
        status: "created",
      });
    } catch (error) {
      if (error.code === 11000) {
        throw new ForesterError({
          description: "Job with this ID already exists",
          httpStatusCode: HttpStatusCode.BadRequest,
        });
      }
      throw new ForesterError({
        description: "Error creating job",
        httpStatusCode: HttpStatusCode.InternalServerError,
      });
    }
  }

  async getJobById(jobId: string): Promise<Job> {
    return await JobModel.findOne({ uuid: jobId });
  }

  async getJobs(): Promise<Job[]> {
    return await JobModel.find();
  }

  async updateJob(jobId: string, job: JobUpdateDto): Promise<Job> {
    return await JobModel.findOneAndUpdate({ uuid: jobId }, job, { new: false });
  }

  async deleteJob(jobId: string): Promise<void> {
    return await JobModel.findOneAndDelete({ uuid: jobId });
  }
}
