import yaml from 'js-yaml';
import ini from 'js-ini';

export default function parse(data, extname) {
  switch (extname) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    case '.ini':
      return JSON.parse(JSON.stringify(ini.parse(data)));
    default:
      throw new Error(`Unexpected file format, open ${path} (${format})`);
  }
}
