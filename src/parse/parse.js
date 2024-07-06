import yaml from 'js-yaml';
import iniParse from './iniParse.js';

export default function parse(data, extname) {
  switch (extname) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    case '.ini':
      return iniParse(data);
    default:
      throw new Error(`Unexpected file format (${extname})`);
  }
}
