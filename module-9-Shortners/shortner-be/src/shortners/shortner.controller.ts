import { Request, Response, NextFunction } from 'express';
import { getShortLink } from './shortner.service';

export const createShortLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalLink = req.body.url;

  try {
    const shortLink = await getShortLink(originalLink);
    res.status(201).json({ originalLink, shortLink });
  } catch (err) {
    next(err);
  }
};
