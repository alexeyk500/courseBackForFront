# courseBackForFront

https://stepik.org/course/233860/syllabus


Запуск Redis с использованием Docker Desktop
docker run -d --rm --name=my-redis -p 6379:6379 redis:6.0.8

Для выполнения команд напрямую к Redis через терминал
docker exec -it my-redis redis-cli

Для остановки Redis
docker stop my-redis

Итого, всего три команды =)