import {sum} from './utils/sum';

// Если хотим использовать для загрузки переменных окружения пакет dotenv
import "dotenv/config"

console.log(process.env.MY_SECRET_KEY)

console.log(sum(2,3));
console.log(__dirname);