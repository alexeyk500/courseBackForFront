import { Schema, Document, model, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  generateToken: () => string;
}

interface IUserDoc extends Document, IUser {}

export interface IUserModel extends Model<IUserDoc> {
  findByCredentials: (email: string, password: string) => Promise<string>;
}

const UserSchema = new Schema<IUserDoc>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (email: string) => {
          const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: 'Email is not valid',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

UserSchema.pre('save', function (next) {
  console.log('this', this);
  next();
});

UserSchema.post('save', function (doc, next) {
  console.log('doc', doc);
  next();
});

UserSchema.pre('find', function (next) {
  const findQuery = this.getQuery();
  console.log('findQuery', findQuery);
  next();
});

UserSchema.methods.generateToken = function () {
  return 'token-123';
};

UserSchema.statics.findByCredentials = async function (
  email: string,
  password: string,
) {
  return new Promise((res) => res(email + ':' + password));
};

const UserModel: Model<IUser> = model<IUser, IUserModel>('user', UserSchema);

export default UserModel;
