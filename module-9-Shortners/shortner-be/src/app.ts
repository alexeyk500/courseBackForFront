import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { errorHandler } from './middlewares/error-handler';
import shortnerRouter from './shortners/shortner.router';
import userRouter from './users/user.router';
import { authHandler } from './middlewares/authHandler';

const app = express();

const { PORT, MONGO_URL } = process.env;

app.use(cookieParser());
app.use(express.json());
app.use(userRouter);

app.use(authHandler);

app.use(shortnerRouter);
app.use(errorHandler);

const run = async () => {
  await mongoose.connect(MONGO_URL as string);
  console.log('MongoDB connected');

  try {
    app.listen(PORT, () => {
      console.log('Server started on', PORT);
    });
  } catch (error) {
    console.error(error);
  }
};

run().then();
