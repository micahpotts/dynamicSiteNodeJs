// handle http route GET / and POST / i.e. home
const home = (request, response) => {
  //if url == '/' && GET
  if(request.url === "/") {
    //show url
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.write('Header\n');
    response.write('Search\n');
    response.end('Footer\n');
  }
}
  //if url == '/' && POST
    //redirect to /:username

// handle http route GET /  :usermane i.e. /micahpotts
const user = (request, response) => {
  //if url == '/....'
  let username = request.url.replace("/", "");
  if(username.length > 0) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.write('Header\n');
    response.write(username + '\n');
    response.end('Footer\n');
    //get json from Treehouse
      //on "end"
        //show profile
      //on "error"
        //show error
  }
}

module.exports.home = home;
module.exports.user = user;
