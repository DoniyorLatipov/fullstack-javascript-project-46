import stylishDiff from './diffFormat/stylish.js';
import plainDiff from './diffFormat/plain.js';
import jsonDiff from './diffFormat/json.js';

export default function getDiff(data1, data2, format) {
  switch (format) {
    case 'stylish':
      return stylishDiff(data1, data2);
    case 'plain':
      return plainDiff(data1, data2);
    case 'json':
      return jsonDiff(data1, data2);
    default:
      throw new Error(`unknown format, used ${format}`);
  }
}
