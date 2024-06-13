import getKeys from '../getKeys.js';
import _ from 'lodash';

export default function formatterEngine(
  data1,
  data2,
  {
    iterValue,
    getDefaultAcc,
    getNewIterValue,
    merge,
    addChanged,
    addAdded,
    addRemoved,
    addUnchanged,
    convert,
  },
) {
  const iter = (data1, data2, iterValue) => {
    const keys = getKeys(data1, data2);

    return keys.reduce((acc, key) => {
      const value1 = data1[key];
      const value2 = data2[key];

      if (_.isObject(value1) && _.isObject(value2)) {
        const newIterValue = getNewIterValue(iterValue, key);
        acc = merge(acc, iter(value1, value2, newIterValue), key);
      } else if (!Object.hasOwn(data1, key)) {
        acc = addAdded(acc, key, value2, iterValue);
      } else if (!Object.hasOwn(data2, key)) {
        acc = addRemoved(acc, key, value1, iterValue);
      } else if (value1 !== value2) {
        acc = addChanged(acc, key, value1, value2, iterValue);
      } else {
        acc = addUnchanged(acc, key, value1, iterValue);
      }
      return acc;
    }, getDefaultAcc());
  };

  const res = iter(data1, data2, iterValue);
  return convert(res);
}
