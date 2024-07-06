import parse from '../src/parse/parse.js';

describe("parse's main flow", () => {
  const jsonData = `{
  "host": "hexlet.io",
  "system": {
   "time": 128,
    "os": "Linux"
  }
}`;
  const yamlData = '---\nhost: hexlet.io\nsystem:\n  time: 128\n  os: Linux\n';
  const iniData = 'host=hexlet.io\n\n[system]\ntime=128\nos=Linux';

  const expected = {
    host: 'hexlet.io',
    system: {
      time: 128,
      os: 'Linux',
    },
  };

  test('parse JSON file', () => {
    expect(parse(jsonData, '.json')).toStrictEqual(expected);
  });

  test('parse YAML file', () => {
    expect(parse(yamlData, '.yml')).toStrictEqual(expected);
  });

  test('parse INI file', () => {
    expect(parse(iniData, '.ini')).toStrictEqual(expected);
  });
});

describe('parse invalid file', () => {
  test('parse isEmpty', () => {
    expect(() => parse()).toThrow();
  });

  test('parse invalid file type', () => {
    expect(() => parse('{"host": "hexlet.io"}', '.exe')).toThrow();
  });

  test('parse invalid file data', () => {
    expect(() => parse('{{"host": "hexlet.io"}', '.json')).toThrow();
  });
});
