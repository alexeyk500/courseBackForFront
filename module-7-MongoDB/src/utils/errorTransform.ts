import { Error } from 'mongoose';

export const errorTransform = (err: Error.ValidationError) => {
  return Object.values(err.errors).map((curErr) => ({
    message: (curErr as { message: string }).message,
  }));
};
