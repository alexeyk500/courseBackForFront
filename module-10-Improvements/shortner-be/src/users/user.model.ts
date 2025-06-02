import { Schema, Document, Model, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import NotAuthorizedError from '../errors/not-authorized-error';
import { genSalt, hash, compare } from 'bcryptjs';

export interface IUser {
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  generateAccessToken: () => string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  findByCredentials: (
    email: string,
    password: string,
  ) => Promise<IUserDocument | never>;
}

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

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const salt = await genSalt(8);
      this.password = await hash(this.password, salt);
    }
  } catch (err) {
    next(err as Error);
  }
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

userSchema.statics.findByCredentials = async function (
  email: string,
  password: string,
) {
  const user = await this.findOne({ email })
    .select('+password')
    .orFail(() => new NotAuthorizedError('User with credentials not found'));
  const isPasswordCorrect = await compare(
    password,
    (user as IUserDocument).password,
  );
  if (!isPasswordCorrect) {
    throw new NotAuthorizedError('Invalid credentials');
  }
  return user;
};

const UserModel = model<IUserDocument, IUserModel>('user', userSchema);

export default UserModel;
