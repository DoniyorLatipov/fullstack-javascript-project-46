import fs from 'fs';
import { extname } from 'path';
import yaml from 'js-yaml';

export default function parse(path) {
  const format = extname(path);

  let formatParse;
  switch (format) {
    case '.json':
      formatParse = JSON.parse;
      break;
    case '.yml':
    case '.yaml':
      formatParse = yaml.load;
      break;
    default:
      throw new Error(`Unexpected file format, open ${path} (${format})`);
  }

  const data = fs.readFileSync(path, 'utf8', () => {});
  return formatParse(data);
}
