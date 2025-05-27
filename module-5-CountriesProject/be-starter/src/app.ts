import express from "express";
import appRouter from "./routers";
import cors from 'cors';
import { errorHandler } from './middlewares/errorHadler';
import { redisInit } from './redis/redisClient';

const app = express();

app.use(cors());
app.use(appRouter);
app.use(errorHandler);

const run = async () => {
  try {
    await redisInit();
    app.listen(3000, ()=>{
      console.log('Server started on 3000');
    })
  } catch (err){
    console.log(err);
  }
}

run().then();


