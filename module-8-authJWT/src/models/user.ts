import { Document, Model, Schema, model } from 'mongoose';

interface IUser {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  generateToken: () => void;
}

interface IUserDoc extends Document, IUser {}

interface IUserModel extends Model<IUserDoc> {
  findByCredentials: (email: string, password: string) => void;
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
  // hash password
  console.log('Pre save hook');
  next();
});

userSchema.methods.generateToken = function () {};

userSchema.statics.findByCredentials = async function (email, password) {
  console.log(email, password);
};

const User = model<IUser, IUserModel>('user', userSchema);

export default User;
