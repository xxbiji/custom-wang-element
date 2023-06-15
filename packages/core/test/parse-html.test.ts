import { customWangElement } from '@/custom-element';
import datasetKey from '@/dataset-key';
import { parseElemHtml } from '@/parse-elem-html';
import createEditor from './utils/create-editor';

function createElement(tag: string) {
  return window.document.createElement(tag);
}

describe('test parseHtml', () => {
  test('test countbtn', () => {
    const editor = createEditor();
    const $div = createElement('div');
    $div.setAttribute(datasetKey.elementType, 'countbtn');
    $div.setAttribute(datasetKey.value, '0');
    const result = parseElemHtml($div, [], editor);
    expect(result).toEqual(customWangElement('countbtn', '0'));
  });
  test('test no value', () => {
    const editor = createEditor();
    const $div = createElement('div');
    $div.setAttribute(datasetKey.elementType, 'countbtn');
    const result = parseElemHtml($div, [], editor);
    expect(result).toEqual(customWangElement('countbtn', ''));
  });
  test('test no type', () => {
    const editor = createEditor();
    const $div = createElement('div');
    $div.setAttribute(datasetKey.value, '0');
    const result = parseElemHtml($div, [], editor);
    expect(result).toEqual(customWangElement('', '0'));
  });
});
