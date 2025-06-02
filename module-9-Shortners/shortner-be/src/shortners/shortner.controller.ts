import { Request, Response, NextFunction } from 'express';
import { getShortLink } from './shortner.service';
import ShortnerModel, { IShortnerDocument } from './shortner.model';
import { Error as MongooseError } from 'mongoose';
import { transformError } from '../helpers/transform-error';
import BadRequestError from '../errors/bad-request-error';

export const createShortLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalLink = req.body.url;

  try {
    const owner = res.locals.user;
    const shortLink = await getShortLink(originalLink);

    const newShortner = (await ShortnerModel.create({
      originalLink,
      shortLink,
      owner,
    })) as unknown as IShortnerDocument;

    res.status(201).json({
      id: newShortner._id,
      originalLink: newShortner.originalLink,
      shortLink: newShortner.shortLink,
    });
  } catch (err: any) {
    if (err instanceof MongooseError.ValidationError) {
      const errors = transformError(err);
      next(new BadRequestError(errors[0].message));
    }
    console.log(err);
    next(err);
  }
};
