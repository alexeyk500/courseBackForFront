import express from "express";
import appRouter from "./routes";
import path from "node:path";

const app = express();

// Раздача статики
app.use(express.static(path.join(__dirname, '..', 'public')));

// Парсер JsonBody
app.use(express.json());

app.use(appRouter);

app.listen(3000, ()=>{
  console.log('Server started on 3000');
})