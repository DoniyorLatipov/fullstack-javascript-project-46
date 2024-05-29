const fs = require('fs');

function parse(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8', () => {}));
}

module.exports = parse;
