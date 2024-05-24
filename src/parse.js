const fs = require('fs');

function parse(path) {
  return fs
    .readFileSync(path, 'utf8', () => {})
    .split(/\n|\r\n/)
    .map((el) => el.trim().replaceAll(/,|"/g, ''))
    .slice(1, -2);
}

module.exports = parse;
