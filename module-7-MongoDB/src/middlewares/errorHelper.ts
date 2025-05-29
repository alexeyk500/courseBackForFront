import { Request, Response, NextFunction } from 'express';

const errorHelper = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  res.status(500).send(err);
};

export default errorHelper;
