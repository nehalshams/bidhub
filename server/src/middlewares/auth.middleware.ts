import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";

export function validateUser (req: Request, res: Response, next: NextFunction) {
  const { email, password, firstName, lastName } = req.body;
  console.log('validateUserSignup middleware executing...'); // Debug log
    if(!( email && password && firstName && lastName )){
        return next(new CustomError('Required field is missing.', 400));
    }
    next()
}