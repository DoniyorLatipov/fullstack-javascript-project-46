/* global describe, test, expect, it */
import render from '../src/render.js';
import { jest } from '@jest/globals';

const plane = [
  ['+', 'main', '#23SID'],
  ['-', 'mode', 'free'],
  [' ', 'os', 'Linux'],
];
const nested = [
  [
    ' ',
    'main',
    [
      [' ', 'id', '#23SID'],
      ['+', 'ip', '231.4'],
    ],
  ],
  ['-', 'mode', 'free'],
  ['+', 'os', 'Linux'],
];

const expectedPlane = `{
  + main: #23SID,
  - mode: free,
    os: Linux
}`;
const expectedNested = `{
    main: {
        id: #23SID,
      + ip: 231.4
    },
  - mode: free,
  + os: Linux
}`;

describe("reder's main flow", () => {
  describe('stylish render', () => {
    it('plane render', () => {
      console.log = jest.fn();
      render(plane, 'stylish');
      expect(console.log).toHaveBeenCalledWith(expectedPlane);
    });

    it('nested render', () => {
      console.log = jest.fn();
      render(nested, 'stylish');
      expect(console.log).toHaveBeenCalledWith(expectedNested);
    });
  });
});

describe("reder's secondary flow", () => {
  describe('invalid format', () => {
    test('non-format render', () => {
      const data = [['+', 'data', 'test']];
      expect(() => render(data)).toThrowError();
    });

    test('invalid format render', () => {
      const data = [['+', 'data', 'test']];
      expect(() => render(data, 'stylich')).toThrowError();
    });
  });

  describe('invalid data', () => {
    it('empty data in a stylish render', () => {
      console.log = jest.fn();
      render([], 'stylish');
      expect(console.log).toHaveBeenCalledWith('{}');
    });
  });
});
