import { Schema, Document, model, Model } from 'mongoose';
import { IUser } from './user.model';

const CategorySchema = new Schema({
  title: String,
  color: String,
});

const TagSchema = new Schema({
  title: String,
  color: String,
});

interface ITodo extends Document {
  title: string;
  completed: boolean;
  owner: IUser;
  categories: {title: string, color: string}[];
  tag: {title: string, color: string} | null;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    categories: {
      type: [CategorySchema],
      default: [],
    },
    tag: {
      type: TagSchema,
      default: null
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const TodoModel = model<ITodo, Model<Document, ITodo>>('item', TodoSchema);

export default TodoModel;
