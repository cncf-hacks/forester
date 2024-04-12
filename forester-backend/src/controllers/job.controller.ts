import { HttpStatusCode } from "axios";
import { ForesterError } from "../exceptions/foresterError";
import { Body, Controller, Post, Query, Route, SuccessResponse, Tags, Response, Get, Put, Delete } from "tsoa";
import JobService from "../services/job.service";
import EmailService from "../services/email.service";
import { JobCreateDto, JobGetDto, JobUpdateDto } from "./job.types";
import { config } from "../utils/startup";

@Route("job")
@Tags("Job Controller Routes")
export class JobController extends Controller {
  private jobService: JobService = new JobService();
  private emailService: EmailService = new EmailService();

  @Post("/")
  @SuccessResponse("200", "OK")
  @Response<ForesterError>(HttpStatusCode.BadRequest, "Bad Request")
  public async createJob(@Body() job: JobCreateDto): Promise<JobGetDto> {
    const newJob = await this.jobService.createJob(job);
    return newJob;
  }

  @Get("/")
  @SuccessResponse("200", "OK")
  public async getJobs(): Promise<JobGetDto[]> {
    return await this.jobService.getJobs();
  }

  @Get("/{jobId}")
  @SuccessResponse("200", "OK")
  @Response<ForesterError>(HttpStatusCode.NotFound, "Job Not Found")
  public async getJobById(jobId: string): Promise<JobGetDto> {
    return await this.jobService.getJobById(jobId);
  }

  @Put("/{jobId}")
  @SuccessResponse("200", "OK")
  @Response<ForesterError>(HttpStatusCode.NotFound, "Job Not Found")
  public async updateJob(@Query() jobId: string, @Body() job: JobUpdateDto): Promise<JobGetDto> {
    return await this.jobService.updateJob(jobId, job);
  }

  @Delete("/{jobId}")
  @SuccessResponse("200", "OK")
  @Response<ForesterError>(HttpStatusCode.NotFound, "Job Not Found")
  public async deleteJob(@Query() jobId: string): Promise<void> {
    return await this.jobService.deleteJob(jobId);
  }

  @Post("/{jobId}/publish")
  @SuccessResponse("200", "OK")
  @Response<ForesterError>(HttpStatusCode.NotFound, "Job Not Found")
  public async publishResults(@Query() jobId: string, @Body() results: any): Promise<any> {
    const job = await this.jobService.getJobById(jobId);
    if (job.status !== "running") {
      throw new ForesterError({
        description: "Job is not running",
        httpStatusCode: HttpStatusCode.BadRequest,
      });
    }

    job.lastCompletedRun = new Date();
    await this.jobService.updateJob(jobId, job);

    //TODO encode results according to new model structure
    return this.emailService.sendMail({
      subject: "Job Completed",
      from: config.SMTP_USER,
      to: job.email,
      text: `Your job with id ${job.uuid} has completed on ${job.lastCompletedRun}.`,
    });
  }
}
