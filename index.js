const parse = require('./src/parse.js');
const _ = require('lodash');

function difference(filepath1, filepath2) {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const res = [];

  data1.forEach((line) => res.push(data2.includes(line) ? `  ${line}` : `- ${line}`));
  data2.forEach((line) => res.push(data1.includes(line) ? `  ${line}` : `+ ${line}`));

  const sortedRes = _.uniq(_.sortBy(res, (el) => el.slice(2, el.indexOf(':'))));
  console.log(`{\n${' '.repeat(2)}${sortedRes.join(`,\n${' '.repeat(2)}`)}\n}\n`);
  // for nested
}

module.exports = difference;
