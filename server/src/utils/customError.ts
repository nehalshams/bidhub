// src/utils/customError.ts

export class CustomError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  
      // Ensure the name of this error is the same as the class name
      this.name = this.constructor.name;
  
      // This clips the constructor invocation from the stack trace.
      Error.captureStackTrace(this, this.constructor);
    }
  }
  