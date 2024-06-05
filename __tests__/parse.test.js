/* global describe, test, expect, beforeAll, afterAll */
import parse from '../src/parse.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("parse's main flow", () => {
  beforeAll(() => {
    fs.mkdirSync(`${__dirname}/__fixtures__`);
  });

  afterAll(() => {
    fs.rmSync(`${__dirname}/__fixtures__`, { recursive: true });
  });

  describe('parse JSON file', () => {
    test('parse plane file', () => {
      const filePath = `${__dirname}/__fixtures__/plane.json`;
      fs.writeFileSync(filePath, '{\n  "host": "hexlet.io",\n  "timeout": 10\n}\n');
      const data = parse(filePath);

      expect(data).toStrictEqual({
        host: 'hexlet.io',
        timeout: 10,
      });
    });

    test('parse nested file', () => {
      const filePath = `${__dirname}/__fixtures__/nested.json`;
      fs.writeFileSync(
        filePath,
        '{\n  "host": "hexlet.io",\n  "system": {\n   "time": 128,\n    "os": "Linux"\n  }\n}\n',
      );
      const data = parse(filePath);

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
      const filePath = `${__dirname}/__fixtures__/plane.yaml`;
      fs.writeFileSync(filePath, '---\nhost: hexlet.io\ntimeout: 10\n');
      const data = parse(filePath);

      expect(data).toStrictEqual({
        host: 'hexlet.io',
        timeout: 10,
      });
    });

    test('parse nested file', () => {
      const filePath = `${__dirname}/__fixtures__/nested.yml`;
      fs.writeFileSync(filePath, '---\nhost: hexlet.io\nsystem:\n  time: 128\n  os: Linux\n');
      const data = parse(filePath);

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

  test('parse invalid format', () => {
    const unknownFileFormat = `${__dirname}/__fixtures__/unknown.exe`;
    expect(() => parse(unknownFileFormat)).toThrowError();
  });

  test('parse non-existent file', () => {
    const nonExistentFile = `${__dirname}/__fixtures__/non-existent.json`;
    expect(() => parse(nonExistentFile)).toThrowError();
  });
});
