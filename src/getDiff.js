import stylishDiff from './formatters/stylish.js';
import plainDiff from './formatters/plain.js';
import jsonDiff from './formatters/json.js';

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
