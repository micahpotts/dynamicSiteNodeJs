const router = require("./router.js");
//Problem: We need a simple way to look at a user's badge count and JS points from a web browser
//Solution: Use node.js to perform the profile lookups and serve our templates via http

// create a webserver
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
  router.home(request, response);
  router.user(request, response);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
