import _ from 'lodash';
import getKeys from '../getKeys.js';

export default function jsonDiff(data1, data2) {
  const iter = (data1, data2, pathArray) => {
    const keys = getKeys(data1, data2);

    return keys.reduce(
      (acc, key) => {
        const value1 = data1[key];
        const value2 = data2[key];
        const path = pathArray.join('');

        if (_.isObject(value1) && _.isObject(value2)) {
          acc = _.merge(acc, iter(value1, value2, [...pathArray, `['${key}']`]));
        } else if (!Object.hasOwn(data2, key)) {
          acc.removed[path] = value1;
        } else if (!Object.hasOwn(data1, key)) {
          acc.added[path] = value2;
        } else if (value1 !== value2) {
          acc.changed[path] = { old: value1, new: value2 };
        }
        return acc;
      },
      { changed: {}, added: {}, removed: {} },
    );
  };

  const res = iter(data1, data2, []);
  return JSON.stringify(res, null, '  ');
}
