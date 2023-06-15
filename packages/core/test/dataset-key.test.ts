import { toDatasetKey } from '@/dataset-key';

function baseTest(param: string, expectedValue: string) {
  const result = toDatasetKey(param);
  expect(result).toEqual(expectedValue);
}

describe('test toDatasetKey function', () => {
  
  test('test ""', () => {
    baseTest('', '');
  });
  test('test "data"', () => {
    baseTest('data', '');
  });
  test('test "data-"', () => {
    baseTest('data-', '');
  });
  test('test "data-a"', () => {
    baseTest('data-a', 'a');
  });
  test('test "data-a-b"', () => {
    baseTest('data-a-b', 'aB');
  });
  test('test "data--b"', () => {
    baseTest('data--b', '-B');
  });
  test('test "data-a--b"', () => {
    baseTest('data-a--b', 'a-B');
  });
  test('test "data-a---b"', () => {
    baseTest('data-a---b', 'a--B');
  });
  test('test "data-ab-cd"', () => {
    baseTest('data-ab-cd', 'abCd');
  });
  test('test "data-ab-cd-efg"', () => {
    baseTest('data-ab-cd-efg', 'abCdEfg');
  });
  test('test "data-ab-1cd-efg"', () => {
    baseTest('data-ab-1cd-efg', 'ab-1cdEfg');
  });
  test('test "data-ab--1cd-efg"', () => {
    baseTest('data-ab--1cd-efg', 'ab--1cdEfg');
  });
});
