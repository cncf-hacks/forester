export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER = 500
}

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

    constructor (args: ForesterErrorArgs) {
        super(args.description);

        Object.setPrototypeOf(this, new.target.prototype);
        
        this.name = args.name || 'ForesterError';
        this.httpStatusCode = args.httpStatusCode || HttpStatusCode.INTERNAL_SERVER;

        this.isOperational = args.isOperational !== undefined ? args.isOperational : true;
        Error.captureStackTrace(this);
    }
}
