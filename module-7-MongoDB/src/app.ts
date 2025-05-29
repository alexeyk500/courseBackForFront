import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';

const app = express();
const { PORT, MONGO_URL } = process.env;

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
