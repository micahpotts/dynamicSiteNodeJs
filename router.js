const Profile = require("./profile.js");

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

    //get json from Treehouse
    let studentProfile = new Profile(username);
    //on "end"
    studentProfile.on("end", (profileJSON) => {
      //show profile

      //store the values we need
      let values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      //simple response
      response.write(values.username + ' has ' + values.badges + ' badges\n');
      response.end('Footer\n');
    });

    //on "error"
    studentProfile.on("error", (error) => {
      //show error
      response.write(error.message + '\n');
      response.end('Footer\n');
    });

  }
}

module.exports.home = home;
module.exports.user = user;
