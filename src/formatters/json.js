import _ from 'lodash';

const getPath = (pathArray, key) => `${pathArray.join('')}['${key}']`;

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
  addChanged(acc, key, [value1, value2], pathArray) {
    const newAcc = { ...acc };
    newAcc.changed[getPath(pathArray, key)] = { old: value1, new: value2 };
    return newAcc;
  },
  addAdded(acc, key, value2, pathArray) {
    const newAcc = { ...acc };
    newAcc.added[getPath(pathArray, key)] = value2;
    return newAcc;
  },
  addRemoved(acc, key, value1, pathArray) {
    const newAcc = { ...acc };
    newAcc.removed[getPath(pathArray, key)] = value1;
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
