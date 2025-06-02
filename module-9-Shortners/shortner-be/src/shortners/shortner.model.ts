import { Schema, model, Document, Model } from 'mongoose';

export interface IShortner {
  originalLink: string;
  shortLink: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IShortnerDocument extends IShortner, Document {}

export type IShortnerModel = Model<IShortnerDocument>;

const ShortnerSchema = new Schema<IShortnerDocument>(
  {
    originalLink: {
      type: String,
      required: [true, 'Original link is required'],
    },
    shortLink: {
      type: String,
      required: [true, 'Short link is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ShortnerModel = model<IShortnerDocument, IShortnerModel>(
  'item',
  ShortnerSchema,
);

export default ShortnerModel;
