import { Schema, model, Document, Model } from 'mongoose';

export interface IShortner {
  originalLink: string;
  shortLink: string;
  owner: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  checkOwner: (owner: string) => boolean;
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Owner is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

ShortnerSchema.methods.checkOwner = async function (ownerId: string) {
  return this.owner.toString() === ownerId.toString();
};

const ShortnerModel = model<IShortnerDocument, IShortnerModel>(
  'item',
  ShortnerSchema,
);

export default ShortnerModel;
