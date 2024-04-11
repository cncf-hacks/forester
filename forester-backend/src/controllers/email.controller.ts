import { HttpStatusCode } from "axios";
import { ForesterError } from "../exceptions/foresterError";
import { Body, Controller, Post, Query, Route, SuccessResponse, Tags, Response } from "tsoa";

@Route("email")
@Tags("Email Controller Routes")
export class EmailController extends Controller {
  //   emailService: EmailService = new EmailService();

  @Post("/")
  @SuccessResponse("200", "OK")
  @Response<ForesterError>(HttpStatusCode.BadRequest, "Bad Request")
  @Response<ForesterError>(HttpStatusCode.Forbidden, "Unauthorized")
  public async sendEmail(@Query() token: String, @Body() body: any): Promise<any> {}
}
