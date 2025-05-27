import express from "express";
import appRouter from "./routers";
import cors from 'cors';
import { errorHandler } from './middlewares/errorHadler';

const app = express();

app.use(cors());
app.use(appRouter);
app.use(errorHandler);

app.listen(3000, ()=>{
        console.log('Server started on 3000');
})
