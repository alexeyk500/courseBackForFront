import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import authError from '../errors/authError';

const authHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  const jwtSecret = process.env.JWT_SECRET as string;

  if (!token || !jwtSecret) {
    next(new authError())
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    res.locals.user = payload;
    next()
  } catch (err) {
      next(new authError())
  }

}

export default authHandler