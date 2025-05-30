## MongoDB setup

Start Mongo via Docker

```bash
docker run --name my-mongo -dit -p 27017:27017 --rm mongo:4.4.1
```

To run MongoDB commands in the terminal

```bash
docker exec -it my-mongo mongo
```

For MongoDB GUI use [Compass](<[https://mongodb.prakticum-team.ru/download-center/compass](https://mongodb.prakticum-team.ru/download-center/compass)>)


To stop MongoDB container

```bash
docker stop my-mongo
```

Команда для генерации секретного ключа с использованием Node.js 
и встроенного модуля crypto, выполненная через однострочную команду node -e:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Команда для генерации секретного ключа co спецсимволами и заглавными буквами:
```bash
node -e 'const crypto = require("crypto"); const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?"; let key = Array.from(crypto.randomBytes(32)).map(b => chars[b % chars.length]).join(""); console.log(key)'
```