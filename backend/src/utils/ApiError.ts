class ApiError extends Error {
    statusCode: number;
    data: any;
    success: boolean;
    errors: any[];
    constructor(statusCode: number,message: string = "Something went wrong", errros: any[] = [],stack: string = ""){
        super(message)
        this.data=null;
        this.statusCode= statusCode
        this.success = false;
        this.errors = errros

        if (stack) {
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export { ApiError };