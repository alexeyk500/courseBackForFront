import { Request, Response, NextFunction } from 'express';
import NotAuthorizedError from '../errors/not-authorized-error';
import jwt from 'jsonwebtoken';

export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    next(new NotAuthorizedError());
  }

  try {
    const { id } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string,
    ) as { id: string };
    res.locals.user = id;
    next();
  } catch {
    next(new NotAuthorizedError());
  }
};
