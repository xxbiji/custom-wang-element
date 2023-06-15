import { customWangElement } from '@/custom-element';
import datasetKey from '@/dataset-key';
import { elemToHtml } from '@/elem-to-html';

describe('test elemToHtml', () => {
  test('test ""', () => {
    const result = elemToHtml(customWangElement('test', ''));
    expect(result).toBe(`<span ${datasetKey.elementType}="test" ${datasetKey.value}=""></span>`);
  });
  test('test "string"', () => {
    const result = elemToHtml(customWangElement('test', 'string'));
    expect(result).toBe(`<span ${datasetKey.elementType}="test" ${datasetKey.value}="string"></span>`);
  });
});