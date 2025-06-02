import { Request, Response, NextFunction } from 'express';
import { getShortLink } from './shortner.service';
import ShortnerModel, { IShortnerDocument } from './shortner.model';
import { Error as MongooseError } from 'mongoose';
import { transformError } from '../helpers/transform-error';
import BadRequestError from '../errors/bad-request-error';
import ForbiddenError from '../errors/forbidden-error';
import NotFoundError from '../errors/not-found-error';

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
      return;
    }
    next(err);
  }
};

export const getAllShortLinksByUser = async (req: Request, res: Response) => {
  const owner = res.locals.user;
  const shortners =
    ((await ShortnerModel.find({ owner })) as IShortnerDocument[]) || [];
  res.send(
    shortners.map((shortner) => ({
      id: shortner._id,
      originalLink: shortner.originalLink,
      shortLink: shortner.shortLink,
    })),
  );
};

export const updateShortLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  const originalLink = req.body.url;
  const ownerId = res.locals.user;

  try {
    const currentShortLink = (await ShortnerModel.findById(
      id,
    ).orFail()) as IShortnerDocument;

    if (!currentShortLink.checkOwner(ownerId)) {
      next(new ForbiddenError('You have no rights to access at this resource'));
      return;
    }

    const shortLink = await getShortLink(originalLink);
    await currentShortLink.updateOne({
      originalLink,
      shortLink,
    });
    await currentShortLink.save();

    res.send({ id, originalLink, shortLink });
  } catch (err) {
    if (err instanceof MongooseError.CastError) {
      next(new BadRequestError('Invalid Url'));
      return;
    }

    if (err instanceof MongooseError.DocumentNotFoundError) {
      next(new NotFoundError('Short url not found'));
      return;
    }

    if (err instanceof MongooseError.ValidationError) {
      const errors = transformError(err);
      next(new BadRequestError(errors[0].message));
      return;
    }
    next(err);
  }
};

export const deleteShortLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  const ownerId = res.locals.user;

  try {
    const currentShortLink = (await ShortnerModel.findById(
      id,
    ).orFail()) as IShortnerDocument;

    if (!currentShortLink.checkOwner(ownerId)) {
      next(new ForbiddenError('You have no rights to access at this resource'));
      return;
    }

    await ShortnerModel.findByIdAndDelete(id);

    res.json({ message: `short link with id ${id} - deleted` });
  } catch (err) {
    if (err instanceof MongooseError.CastError) {
      next(new BadRequestError('Invalid Url'));
      return;
    }

    if (err instanceof MongooseError.DocumentNotFoundError) {
      next(new NotFoundError('Short url not found'));
      return;
    }
    next(err);
  }
};
