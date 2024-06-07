import _ from 'lodash';

export default function jsonDiff(data1, data2) {
  const iter = (data1, data2, pathArray) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const keys = _.union(keys1, keys2).sort();

    return keys.reduce(
      (acc, key) => {
        const value1 = data1[key];
        const value2 = data2[key];
        const path = pathArray.join('');

        if (_.isObject(value1) && _.isObject(value2)) {
          const childValue = iter(data1[key], data2[key], [...pathArray, `['${key}']`]);
          return _.merge(acc, childValue);
        } else if (!Object.hasOwn(data2, key)) {
          acc.removed[path] = value1;
        } else if (!Object.hasOwn(data1, key)) {
          acc.added[path] = value2;
        } else if (value1 !== value2) {
          acc.changed[path] = {
            old: value1,
            new: value2,
          };
        }
        return acc;
      },
      { changed: {}, added: {}, removed: {} },
    );
  };

  const res = iter(data1, data2, []);
  return JSON.stringify(res);
}
