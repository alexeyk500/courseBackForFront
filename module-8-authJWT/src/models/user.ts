import { Document, Model, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authError from '../errors/authError';

export interface IUser {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  generateToken: () => string;
}

interface IUserDoc extends Document, IUser {}

interface IUserModel extends Model<IUserDoc> {
  findByCredentials: (
    email: string,
    password: string,
  ) => Promise<IUserDoc | never>;
}

const userSchema = new Schema(
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
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    next(err as Error);
  }
  next();
});

userSchema.methods.generateToken = function () {
  const jwtSecret = process.env.JWT_SECRET as string;
  return jwt.sign({ id: this._id }, jwtSecret, { expiresIn: '1h' });
};

userSchema.statics.findByCredentials = async function (
  email: string,
  password: string,
) {
  const user = (await this.findOne({ email })
    .select('+password')
    .orFail(() => new authError('Wrong user credentials'))) as IUserDoc;

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new authError('Wrong user credentials');
  }

  return user;
};

const User = model<IUser, IUserModel>('user', userSchema);

export default User;
