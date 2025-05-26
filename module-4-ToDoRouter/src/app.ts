import express from "express";
import appRouter from "./routes";
import path from "node:path";
import { errors } from 'celebrate'
import { errorHandler } from "./middlewares/errorHadler";
import { customCors } from "./middlewares/customCors";

const app = express();

// Установка политики CORS и разрешенных доменов
app.use(customCors);

// Раздача статики
app.use(express.static(path.join(__dirname, '..', 'public')));

// Парсер JsonBody
app.use(express.json());

// Подключение роутера приложения
app.use(appRouter);

// Обработчик ошибок валидации Celebrate
app.use(errors());

// Обработчик ошибок в приложении Express
app.use(errorHandler)

app.listen(3000, ()=>{
  console.log('Server started on 3000');
})