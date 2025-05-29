import { Schema, Document, model, Model } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
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

const UserModel: Model<IUser> = model('user', UserSchema);

export default UserModel;
