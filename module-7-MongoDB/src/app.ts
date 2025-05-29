import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import errorHelper from './middlewares/errorHelper';
import userRouter from './routes/user.router';
import todoRouter from './routes/todo.router';

const { PORT, MONGO_URL } = process.env;

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(todoRouter);
app.use(errorHelper);

const run = async () => {
  try {
    await mongoose.connect(MONGO_URL as string);
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log('Server started on', PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

run().then();
