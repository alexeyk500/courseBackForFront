import { Schema, Document, Model, model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {}

export type IUserModel = Model<IUserDocument>;

const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          return emailRegex.test(value);
        },
        message: 'Email is not valid.',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  },
);

const UserModel = model<IUserDocument, IUserModel>('user', userSchema);

export default UserModel;
