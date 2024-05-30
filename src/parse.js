import fs from 'fs';

export default function parse(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8', () => {}));
}
