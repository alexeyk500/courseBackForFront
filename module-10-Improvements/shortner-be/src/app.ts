import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import cors from 'cors'

import { errorHandler } from './middlewares/error-handler';
import shortnerRouter from './shortners/shortner.router';
import userRouter from './users/user.router';
import { authHandler } from './middlewares/authHandler';
import { fakeHandler } from './middlewares/fakeHandler';
import { errorLogger, requestLogger } from './middlewares/loggerHandler';

const app = express();

const { PORT, MONGO_URL, FRONTEND_URL } = process.env;

// Доп мидлвары для безопасности сервера
app.disable('x-powered-by');
app.use(fakeHandler);


app.use(cors({
  origin: FRONTEND_URL as string,
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(userRouter);

app.use(authHandler);

app.use(shortnerRouter);

app.use(errorLogger);
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
