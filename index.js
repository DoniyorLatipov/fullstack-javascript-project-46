const parse = require('./src/parse.js');
const _ = require('lodash');

function difference(filepath1, filepath2) {
  const data = [
    ...parse(filepath1).map((el) => `- ${el}`),
    ...parse(filepath2).map((el) => `+ ${el}`),
  ];

  const res = data.map((line) => {
    const value = line.slice(2);
    const opposite = line[0] === '+' ? `- ${value}` : `+ ${value}`;
    console.log(line, opposite);
    if (data.includes(opposite)) {
      return `  ${value}`;
    }
    return line;
  });

  const sortedRes = _.uniq(_.sortBy(res, (el) => el.slice(2, el.indexOf(':'))));
  console.log(`{\n${' '.repeat(2)}${sortedRes.join(`,\n${' '.repeat(2)}`)}\n}\n`);
  // repeat for nested
}

module.exports = difference;
