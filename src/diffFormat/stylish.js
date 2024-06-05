import _ from 'lodash';

export default function getStylishDiff(data1, data2) {
  const difference = getStylishFormatDiff(data1, data2);

  const iter = (data, depth) => {
    if (data.length === 0) {
      return '{}';
    }

    const res = data.map(([symbol, key, value]) => {
      const currentValue = _.isArray(value) ? iter(value, depth + 1) : value;
      return `  ${symbol} ${key}: ${currentValue}`;
    });

    const space = ' '.repeat(4 * depth);
    return `{\n${space}${res.join(`\n${space}`)}\n${space}}`;
  };

  return iter(difference, 0);
}

function getStylishFormatDiff(data1, data2) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2).sort();
  const difference = [];

  keys.forEach((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      difference.push([' ', key, getStylishFormatDiff(value1, value2)]);
    } else if (value1 === value2) {
      difference.push([' ', key, value1]);
    } else {
      if (Object.hasOwn(data1, key)) {
        const curValue1 = _.isObject(value1) ? getStylishFormatDiff(value1, value1) : value1;
        difference.push(['-', key, curValue1]);
      }
      if (Object.hasOwn(data2, key)) {
        const curValue2 = _.isObject(value2) ? getStylishFormatDiff(value2, value2) : value2;
        difference.push(['+', key, curValue2]);
      }
    }
  });

  return difference;
}