const fs = require('fs');

function view(templateName, values, response) {
//const view = (templateName, values, response) => {
  //read from the template files
  let fileContents = fs.readFileSync('./views/' + templateName + '.html');
    //insert values into the content

    //write out the contents to the response
    response.write(fileContents);

}

module.exports.view  = view;
