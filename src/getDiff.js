import _ from 'lodash';

export default function getDiff(data1, data2) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2).sort();
  const res = [];

  keys.forEach((key) => {
    if (data1[key] === data2[key]) {
      res.push([' ', key, data1[key]]);
    } else if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      res.push([' ', key, getDiff(data1[key], data2[key])]);
    } else {
      if (Object.hasOwn(data1, key)) {
        res.push(['-', key, data1[key]]);
      }
      if (Object.hasOwn(data2, key)) {
        res.push(['+', key, data2[key]]);
      }
    }
  });

  return res;
}
