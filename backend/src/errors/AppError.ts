class AppError extends Error{
    private statusCode: number;
    private success: boolean;
    constructor(message:string, statusCode=500){
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        Error.captureStackTrace(this,this.constructor);
    }
}

export {AppError};