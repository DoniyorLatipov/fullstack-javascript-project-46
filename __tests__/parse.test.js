/* global describe, test, expect*/
import parse from '../src/parse.js';

describe("parse's main flow", () => {
  describe('parse plane file', () => {
    const jsonData = '{\n  "host": "hexlet.io",\n  "timeout": 10\n}\n';
    const yamlData = '---\nhost: hexlet.io\ntimeout: 10\n';
    const iniData = 'host=hexlet.io\ntimeout=10\n';

    const expected = {
      host: 'hexlet.io',
      timeout: 10,
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

  describe('parse nested file', () => {
    const jsonData =
      '{\n  "host": "hexlet.io",\n  "system": {\n   "time": 128,\n    "os": "Linux"\n  }\n}\n';
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
});

describe('parse invalid file', () => {
  test('parse isEmpty', () => {
    expect(() => parse()).toThrowError();
  });

  test('parse invalid file type', () => {
    expect(() => parse('{"host": "hexlet.io"}', '.exe')).toThrowError();
  });

  test('parse invalid file data', () => {
    expect(() => parse('{{"host": "hexlet.io"}', '.json')).toThrowError();
  });
});
