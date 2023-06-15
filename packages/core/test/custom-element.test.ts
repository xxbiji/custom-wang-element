import { customWangElement } from '@/custom-element';

function baseTest(value: any, expectValue: string) {
  const result = customWangElement('test', value);
  expect(result).toEqual({
    type: 'test',
    value: expectValue,
    children: [{ text: ''}]
  });
}
describe('测试customWangElement', () => {
  test('value is empty string', () => {
    baseTest('', '');
  });
  test('value is string type', () => {
    baseTest('string value', 'string value');
  });
  test('value is number: 0', () => {
    baseTest(0, '0');
  });
  test('value is number: 2023', () => {
    baseTest(2023, '2023');
  });
  test('value is number: 20.23', () => {
    baseTest(20.23, '20.23');
  });

  test('value is boolean: false', () => {
    baseTest(false, 'false');
  });
  test('value is boolean: true', () => {
    baseTest(true, 'true');
  });

  test('value is undefined', () => {
    baseTest(undefined, '');
  });

  test('value is null', () => {
    baseTest(null, '');
  });

  test('value is empty object', () => {
    baseTest({}, '{}');
  });

  test('value is object', () => {
    baseTest({
      a: 1,
      b: '1',
      c: true,
      d: undefined,
      e: null
    }, '{"a":1,"b":"1","c":true,"e":null}');
  });
  test('value is empty array', () => {
    baseTest([], '[]');
  });
  test('value is array', () => {
    baseTest([1, 2], '[1,2]');
  });
  test('value is function', () => {
    baseTest(function(){}, '');
  });
});
