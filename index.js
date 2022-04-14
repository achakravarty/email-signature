const Handlebars = require("handlebars");
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const data = require('./data.json');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

Handlebars.registerHelper("social", function(context, options) {
    var html = "<tbody>";
  
    for (var i = 0, j = context.length; i < j; i++) {
        if(i%2 == 0){
            html = html + "<tr>";
        }
        html = html + "<td>" + options.fn(context[i]) + "</td>";
        if(i%2 != 0){
            html = html + "</tr>";
        }
    }
    
    return html + "</tbody>";
  });

readFile(path.resolve(__dirname, 'signature.handlebars'), 'utf-8').then(htmlTemplate => {
    const template = Handlebars.compile(htmlTemplate);
    const compiledTemplate = template(data);
    return writeFile(path.resolve(__dirname, 'index.html'), compiledTemplate);
}).then(() => {
    console.log('Done');
});

