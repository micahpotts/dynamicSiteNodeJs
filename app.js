//Problem: We need a simple way to look at a user's badge count and JS points from a web browser
//Solution: Use node.js to perform the profile lookups and serve our templates via http

//1 create a webserver
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//2 handle http route GET / and POST / i.e. home
  //if url == '/' && GET
    //show url
  //if url == '/' && POST
    //redirect to /:username

//3 handle http route GET /  :usermane i.e. /micahpotts
  //if url == '/....'
    //get json from Treehouse
      //on "end"
        //show profile
      //on "error"
        //show error

//4 function that handles the reading of files and merge in values
  //read from file and get a string
    //merge values into string
