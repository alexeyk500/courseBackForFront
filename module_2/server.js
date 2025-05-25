import http from "node:http";

const server = http.createServer((req, res)=>{
  // console.log(req);
  console.log(req.url, req.method);
  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader = ('Content-Type', 'text/html');
    res.write('<h1 style="color: blue">Main Paige</h1>');
    res.end();
    return;
  }
  if (req.url === '/about' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader = ('Content-Type', 'text/html');
    res.write('<h1 style="color: green">About Paige</h1>');
    res.end();
    return;
  }
  res.statusCode = 404;
  res.setHeader = ('Content-Type', 'text/html');
  res.write('<h1 style="color: red">The page does not exist</h1>');
  res.end();
})

server.listen(3000, ()=>{
  console.log('Server is running on port 3000')
})