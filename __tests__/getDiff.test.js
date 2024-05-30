/* global describe, test, expect */
import getDiff from '../src/getDiff.js';

describe("getDiff's main flow", () => {
  test('getDiff plane', () => {
    const data1 = { host: 'hexlet.io', timeout: 10 };
    const data2 = { timeout: 20, verbose: true, host: 'hexlet.io' };

    const expected = [
      [' ', 'host', 'hexlet.io'],
      ['-', 'timeout', 10],
      ['+', 'timeout', 20],
      ['+', 'verbose', true],
    ];
    expect(getDiff(data1, data2)).toStrictEqual(expected);
  });

  test('getDiff nested', () => {
    const data1 = { host: 'hexlet.io', timeout: 10, system: { os: 'Linux', ip: '123.22' } };
    const data2 = { timeout: 20, host: 'hexlet.io', system: { os: 'Windows', ip: '123.22' } };

    const expected = [
      [' ', 'host', 'hexlet.io'],
      [
        ' ',
        'system',
        [
          [' ', 'ip', '123.22'],
          ['-', 'os', 'Linux'],
          ['+', 'os', 'Windows'],
        ],
      ],
      ['-', 'timeout', 10],
      ['+', 'timeout', 20],
    ];
    expect(getDiff(data1, data2)).toStrictEqual(expected);
  });
});
