import { HttpStatusCode } from "axios";

interface ForesterErrorArgs {
  name?: string;
  httpStatusCode?: HttpStatusCode;
  description: string;
  isOperational?: boolean;
}

export class ForesterError extends Error {
  public readonly name: string;
  public readonly httpStatusCode: HttpStatusCode;
  public readonly isOperational: boolean = true;

  constructor(args: ForesterErrorArgs) {
    super(args.description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || "ForesterError";
    this.httpStatusCode = args.httpStatusCode || HttpStatusCode.InternalServerError;

    this.isOperational = args.isOperational !== undefined ? args.isOperational : true;
    Error.captureStackTrace(this);
  }
}
