import { compare, genSalt, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Document, Model, Schema, model } from 'mongoose';
import NotAuthorizedError from '../errors/not-authorized-error';

interface User {
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  generateAccessToken: () => string;
}

interface UserDoc extends Document, User {}

interface UserModel extends Model<UserDoc> {
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<UserDoc | never>;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email must be unique'],
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: 'Email is not valid',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      validate: {
        validator: (value: string) => {
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
          return passwordRegex.test(value);
        },
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      },
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
  }
);

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const salt = await genSalt(8);
      this.password = await hash(this.password, salt);
    }
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1h',
    }
  );
};

userSchema.statics.findUserByCredentials = async function (
  email: string,
  password: string
) {
  const user = await this.findOne({ email })
    .select('+password')
    .orFail(
      () => new NotAuthorizedError('User with provided credentials not found')
    );

  const isCorrectPassword = await compare(password, user.password);

  if (isCorrectPassword) {
    return user;
  }

  throw new NotAuthorizedError('Invalid credentials');
};

const userModel = model<User, UserModel>('user', userSchema);

export default userModel;
