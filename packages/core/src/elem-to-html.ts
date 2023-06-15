import { SlateElement } from '@wangeditor/editor';
import { CustomWangElement } from './custom-element';
import datasetKey from './dataset-key';

export function elemToHtml(elem: SlateElement): string {
  const { type, value } = elem as CustomWangElement;
  return `<${datasetKey.tag} ${datasetKey.elementType}="${type}" ${datasetKey.value}="${encodeURIComponent(value)}"></${datasetKey.tag}>`;
}