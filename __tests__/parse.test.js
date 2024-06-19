/* global describe, test, expect, beforeAll, afterAll */
import parse from '../src/parse.js';

describe("parse's main flow", () => {
  describe('parse JSON file', () => {
    test('parse plane file', () => {
      const fileData = '{\n  "host": "hexlet.io",\n  "timeout": 10\n}\n';
      const data = parse(fileData, '.json');

      expect(data).toStrictEqual({
        host: 'hexlet.io',
        timeout: 10,
      });
    });

    test('parse nested file', () => {
      const fileData =
        '{\n  "host": "hexlet.io",\n  "system": {\n   "time": 128,\n    "os": "Linux"\n  }\n}\n';
      const data = parse(fileData, '.json');

      expect(data).toStrictEqual({
        host: 'hexlet.io',
        system: {
          time: 128,
          os: 'Linux',
        },
      });
    });
  });

  describe('parse YAML file', () => {
    test('parse plane file', () => {
      const fileData = '---\nhost: hexlet.io\ntimeout: 10\n';
      const data = parse(fileData, '.yml');

      expect(data).toStrictEqual({
        host: 'hexlet.io',
        timeout: 10,
      });
    });

    test('parse nested file', () => {
      const fileData = '---\nhost: hexlet.io\nsystem:\n  time: 128\n  os: Linux\n';
      const data = parse(fileData, '.yaml');

      expect(data).toStrictEqual({
        host: 'hexlet.io',
        system: {
          time: 128,
          os: 'Linux',
        },
      });
    });
  });

  describe('parse INI file', () => {
    test('parse plane file', () => {
      const fileData = 'host=hexlet.io\ntimeout=10\n';
      const data = parse(fileData, '.ini');

      expect(data).toStrictEqual({
        host: 'hexlet.io',
        timeout: 10,
      });
    });

    test('parse nested file', () => {
      const fileData = 'host=hexlet.io\n\n[system]\ntime=128\nos=Linux';
      const data = parse(fileData, '.ini');

      expect(data).toStrictEqual({
        host: 'hexlet.io',
        system: {
          time: 128,
          os: 'Linux',
        },
      });
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
