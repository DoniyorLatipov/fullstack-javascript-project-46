import _ from 'lodash';

function stylishDiff(data) {
  const iter = (data, depth) => {
    if (data.length === 0) {
      return '{}';
    }

    const res = data.map(([symbol, key, value]) => {
      const currentValue = _.isArray(value) ? iter(value, depth + 1) : value;
      return `  ${symbol} ${key}: ${currentValue}`;
    });

    const space = ' '.repeat(4 * depth);
    return `{\n${space}${res.join(`,\n${space}`)}\n${space}}`;
  };

  return iter(data, 0);
}

export default function render(data, format) {
  switch (format) {
    case 'stylish':
      console.log(stylishDiff(data));
      break;
    default:
      throw new Error(`unknown format, used ${format}`);
  }
}
