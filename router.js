const Profile = require("./profile.js");
const renderer = require("./renderer.js");
var querystring = require("querystring");
const commonHeaders = {'Content-Type': 'text/html'};
// handle http route GET / and POST / i.e. home
const home = (request, response) => {
  //if url == '/' && GET
  if(request.url === "/") {
    if(request.method.toLowerCase() === "get") {
      //show url
      //response.writeHead(200, commonHeaders);
      response.statusCode = 200;
      response.setHeader.commonHeaders;
      renderer.view('header', {}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    } else {
      //if url == '/' && POST

      //get the post data from body
      request.on("data", function(postBody) {
        //extract the username
        var query = querystring.parse(postBody.toString());
        response.write(query.username);
        response.end();
        //redirect to /:username
      });
    }
  }
}


// handle http route GET /  :usermane i.e. /micahpotts
const user = (request, response) => {
  //if url == '/....'
  let username = request.url.replace("/", "");
  if(username.length > 0) {
    //response.writeHead(200, commonHeaders);
    response.statusCode = 200;
    response.setHeader.commonHeaders;
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
