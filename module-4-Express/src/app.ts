import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log('First middleware');
  next();
})

app.use((req, res, next) => {
  console.log('Second middleware');
  next();
})

app.get('/', (req, res) => {
  res.send('<h1 style="color: blue">Hello from Main page</h1>')
})

app.get('/about', (req, res) => {
  res.send('<h1 style="color: green">Hello from About page</h1>')
})

app.all('*path', (req, res) => {
  res.status(404);
  res.send('<h1 style="color: red">Page does not exist</h1>')
})

app.listen(3000, ()=>{
  console.log('Server started on 3000');
})