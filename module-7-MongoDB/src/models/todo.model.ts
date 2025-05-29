import { Schema, Document, model, Model } from 'mongoose';
import { IUser } from './user.model';

interface ITodo extends Document {
  title: string;
  completed: boolean;
  owner: IUser;
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const TodoModel = model<ITodo, Model<Document, ITodo>>('item', TodoSchema);

export default TodoModel;
