import {Request, Response, NextFunction} from "express";
import { BadRequestError } from "../errors/badRequestError";

export const hasValidId = (req: Request, res: Response, next: NextFunction) => {
  if (Number.isNaN(+req.params.id)) {
    throw new BadRequestError('Incorrect id');
  }
  next();
}