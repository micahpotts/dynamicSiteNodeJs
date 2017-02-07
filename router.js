const Profile = require("./profile.js");
const renderer = require("./renderer.js");

// handle http route GET / and POST / i.e. home
const home = (request, response) => {
  //if url == '/' && GET
  if(request.url === "/") {
    //show url
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    renderer.view('header', {}, response);
    renderer.view('search', {}, response);
    renderer.view('footer', {}, response);
    response.end();
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
    renderer.view('header', {}, response);

    //get json from Treehouse
    const studentProfile = new Profile(username);
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
      renderer.view('profile', values, response);
      renderer.view('footer', {}, response);
      response.end();
    });

    //on "error"
    studentProfile.on("error", (error) => {
      //show error
      renderer.view('error', {errorMessage: error.message}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    });

  }
}

module.exports.home = home;
module.exports.user = user;
