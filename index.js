const parse = require('./src/parse');
const getDiff = require('./src/getDiff');
const render = require('./src/render');

function difference(filepath1, filepath2, { format = 'stylish' }) {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const difference = getDiff(data1, data2);
  render(difference, format);
}

module.exports = difference;

console.log([
  [' ', 'host', 'hexlet.io'],
  [
    ' ',
    'system',
    [
      [' ', 'ip', '123.22'],
      ['-', 'os', 'Linux'],
      ['+', 'os', 'Windows'],
    ],
  ],
  ['-', 'timeout', 10],
  ['+', 'timeout', 20],
]);
