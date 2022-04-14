const Handlebars = require("handlebars");
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const data = require('./data.json');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

readFile(path.resolve(__dirname, 'signature.handlebars'), 'utf-8').then(htmlTemplate => {
    const template = Handlebars.compile(htmlTemplate);
    const compiledTemplate = template(data);
    return writeFile(path.resolve(__dirname, 'index.html'), compiledTemplate);
}).then(() => {
    console.log('Done');
});

