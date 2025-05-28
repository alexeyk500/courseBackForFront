import { Request, Response, NextFunction } from 'express';
const publicCache = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 'public, max-age=86400');
  next();
};

export default publicCache;
