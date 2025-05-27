import express from "express";
import appRouter from "./routers";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(appRouter);

app.listen(3000, ()=>{
  console.log('Server started on 3000');
})
