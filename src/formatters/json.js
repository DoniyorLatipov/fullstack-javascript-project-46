import _ from 'lodash';

const getCurrentPath = (pathArray, key) => `${pathArray.join('')}['${key}']`;

const jsonAssets = {
  iterValue: [],
  getDefaultAcc() {
    return { changed: {}, added: {}, removed: {} };
  },
  getNewIterValue(pathArray, key) {
    return [...pathArray, `['${key}']`];
  },
  merge(acc, childAcc) {
    return _.merge(acc, childAcc);
  },
  addChanged(acc, key, value1, value2, pathArray) {
    const newAcc = { ...acc };
    const path = getCurrentPath(pathArray, key);
    newAcc.changed[path] = { old: value1, new: value2 };
    return newAcc;
  },
  addAdded(acc, key, value2, pathArray) {
    const newAcc = { ...acc };
    const path = getCurrentPath(pathArray, key);
    newAcc.added[path] = value2;
    return newAcc;
  },
  addRemoved(acc, key, value1, pathArray) {
    const newAcc = { ...acc };
    const path = getCurrentPath(pathArray, key);
    newAcc.removed[path] = value1;
    return newAcc;
  },
  addUnchanged(acc) {
    return acc;
  },
  convert(difference) {
    return JSON.stringify(difference, null, '  ');
  },
};

export default jsonAssets;
