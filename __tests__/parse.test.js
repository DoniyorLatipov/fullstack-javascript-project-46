const parse = require('../src/parse');
const fs = require('fs');

describe("parse's main flow", () => {
  beforeAll(() => {
    fs.mkdirSync(`${__dirname}/__fixtures__`);
  });

  afterAll(() => {
    fs.rmSync(`${__dirname}/__fixtures__`, { recursive: true });
  });

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

describe('parse non-existent file', () => {
  test('parse isEmpty', () => {
    expect(() => parse()).toThrow();
  });

  test('parse', () => {
    const nonExistentData = `${__dirname}/__fixtures__/non-existent.json`;
    expect(() => parse(nonExistentData)).toThrow();
  });
});
