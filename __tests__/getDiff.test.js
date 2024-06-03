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
    const data1 = {
      common: {
        setting1: 'Value 1',
        setting2: 200,
        setting3: true,
        setting6: {
          key: 'value',
          doge: {
            wow: '',
          },
        },
      },
      group1: {
        baz: 'bas',
        foo: 'bar',
        nest: {
          key: 'value',
        },
      },
      group2: {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
    };

    const data2 = {
      common: {
        follow: false,
        setting1: 'Value 1',
        setting3: null,
        setting4: 'blah blah',
        setting5: {
          key5: 'value5',
        },
        setting6: {
          key: 'value',
          ops: 'vops',
          doge: {
            wow: 'so much',
          },
        },
      },
      group1: {
        foo: 'bar',
        baz: 'bars',
        nest: 'str',
      },
      group3: {
        deep: {
          id: {
            number: 45,
          },
        },
        fee: 100500,
      },
    };

    const expected = [
      [
        ' ',
        'common',
        [
          ['+', 'follow', false],
          [' ', 'setting1', 'Value 1'],
          ['-', 'setting2', 200],
          ['-', 'setting3', true],
          ['+', 'setting3', null],
          ['+', 'setting4', 'blah blah'],
          ['+', 'setting5', [[' ', 'key5', 'value5']]],
          [
            ' ',
            'setting6',
            [
              [
                ' ',
                'doge',
                [
                  ['-', 'wow', ''],
                  ['+', 'wow', 'so much'],
                ],
              ],
              [' ', 'key', 'value'],
              ['+', 'ops', 'vops'],
            ],
          ],
        ],
      ],
      [
        ' ',
        'group1',
        [
          ['-', 'baz', 'bas'],
          ['+', 'baz', 'bars'],
          [' ', 'foo', 'bar'],
          ['-', 'nest', [[' ', 'key', 'value']]],
          ['+', 'nest', 'str'],
        ],
      ],
      [
        '-',
        'group2',
        [
          [' ', 'abc', 12345],
          [' ', 'deep', [[' ', 'id', 45]]],
        ],
      ],
      [
        '+',
        'group3',
        [
          [' ', 'deep', [[' ', 'id', [[' ', 'number', 45]]]]],
          [' ', 'fee', 100500],
        ],
      ],
    ];
    expect(getDiff(data1, data2)).toStrictEqual(expected);
  });
});
