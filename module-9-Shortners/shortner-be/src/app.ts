import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import { errorHandler } from './middlewares/error-handler';
import shortnerRouter from './shortners/shortner.router';

const app = express();

const { PORT, MONGO_URL } = process.env;

app.use(express.json());
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
