const parse = require('./src/parse.js');

function difference(filepath1, filepath2) {
  console.log(parse(filepath1));
  console.log(parse(filepath2));
}

module.exports = difference;
