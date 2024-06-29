import _ from 'lodash';
import getKeys from '../getKeys.js';

export default function formatterEngine(
  data1,
  data2,
  { iterValue, getDefaultAcc, getNewIterValue, merge, addChanged, addAdded, addRemoved, addUnchanged, convert },
) {
  const iter = (obj1, obj2, initialIterValue) => {
    const keys = getKeys(obj1, obj2);

    return keys.reduce((acc, key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      let newAcc = acc;

      if (_.isObject(value1) && _.isObject(value2)) {
        const newIterValue = getNewIterValue(initialIterValue, key);
        newAcc = merge(acc, iter(value1, value2, newIterValue), key);
      } else if (!Object.hasOwn(obj1, key)) {
        newAcc = addAdded(acc, key, value2, initialIterValue);
      } else if (!Object.hasOwn(obj2, key)) {
        newAcc = addRemoved(acc, key, value1, initialIterValue);
      } else if (value1 !== value2) {
        newAcc = addChanged(acc, key, [value1, value2], initialIterValue);
      } else {
        newAcc = addUnchanged(acc, key, value1, initialIterValue);
      }
      return newAcc;
    }, getDefaultAcc());
  };

  const res = iter(data1, data2, iterValue);
  return convert(res);
}
