const fs = require('fs');

function parse(path) {
  return fs.readFileSync(path, 'utf8', () => {});
}

module.exports = parse;
