import { IDomEditor, SlateDescendant, SlateElement } from '@wangeditor/editor';
import { customWangElement } from './custom-element';
import datasetKey from './dataset-key';

export function parseElemHtml(elem: globalThis.Element, children: SlateDescendant[], editor: IDomEditor): SlateElement | SlateElement[] {
  let type = elem.getAttribute(datasetKey.elementType);
  if (typeof type !== 'string') {
    type = '';
  }
  let value = elem.getAttribute(datasetKey.value);
  if (typeof value === 'string') {
    value = decodeURIComponent(value);
  }
  return customWangElement(type, value);
}