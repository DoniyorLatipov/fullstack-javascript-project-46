import _ from 'lodash';

function getFormatedValue(value) {
  if (_.isObject(value)) {
    return '[complex value]';
  } else if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
}

export default function plainDiff(data1, data2) {
  const iter = (data1, data2, pathArray) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const keys = _.union(keys1, keys2).sort();

    return keys.reduce((acc, key) => {
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        acc.push(...iter(data1[key], data2[key], [...pathArray, `${key}.`]));
        return acc;
      }

      const value1 = getFormatedValue(data1[key]);
      const value2 = getFormatedValue(data2[key]);

      if (!Object.hasOwn(data2, key)) {
        acc.push(`Property '${pathArray.join('')}${key}' was removed`);
      } else if (!Object.hasOwn(data1, key)) {
        acc.push(`Property '${pathArray.join('')}${key}' was added with value: ${value2}`);
      } else if (value1 !== value2) {
        acc.push(`Property '${pathArray.join('')}${key}' was updated. From ${value1} to ${value2}`);
      }
      return acc;
    }, []);
  };

  const res = iter(data1, data2, []);
  return res.join('\n');
}
