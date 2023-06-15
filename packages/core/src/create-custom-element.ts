import { DomEditor, IDomEditor, SlateElement, SlateTransforms } from '@wangeditor/editor';
import { ElemOption, normalizeOptions } from './options';
import { elemToHtml } from './elem-to-html';
import { parseElemHtml } from './parse-elem-html';
import { VNode, h } from 'snabbdom';
import { CustomWangElement } from './custom-element';
import datasetKey, { toDatasetKey } from './dataset-key';

export type CmpUpdateOptions = {
  disabled: boolean
  selected: boolean
}

export interface ICmp {
  getEl(): (Element | null)
  unmount(): void
  update(options: CmpUpdateOptions): void
}

export type CmpCreatorOptions = CmpUpdateOptions & {
  defaultValue: string,
  updateValue: (arg: string) => void
}

export type CmpCreator = (options: CmpCreatorOptions) => ICmp

const elMap = new WeakMap<HTMLElement, ICmp>();

export type CustomElementModule = {
  editorPlugin: <T extends IDomEditor>(editor: T) => T;
  renderElems: {
    type: string;
    renderElem: (elem: SlateElement, children: VNode[] | null, editor: IDomEditor) => VNode;
  }[];
  elemsToHtml: {
    type: string;
    elemToHtml: typeof elemToHtml;
  }[];
  parseElemsHtml: {
    selector: string;
    parseElemHtml: typeof parseElemHtml;
  }[];
};

export function createCustomElement(tag: string, cmpCreator: CmpCreator, options?: Partial<ElemOption>): CustomElementModule {
  const _options = normalizeOptions(options);
  return {
    editorPlugin: function<T extends IDomEditor>(editor: T): T {
      const { isInline, isVoid } = editor;
      const newEditor = editor;
      newEditor.isInline = elem => {
        const type = DomEditor.getNodeType(elem);
        if (type === tag) return _options.inline;
        return isInline(elem);
      };
      newEditor.isVoid = elem => {
        const type = DomEditor.getNodeType(elem);
        if (type === tag) return true;
        return isVoid(elem);
      };
      return newEditor;
    },
    renderElems: [{
      type: tag,
      renderElem: (elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode => {   
        const isDisabled = editor.isDisabled();
        const selected = DomEditor.isNodeSelected(editor, elem);
        const { value } = elem as CustomWangElement;
        const attachVnode = h(
          _options.tag,
          {
            ..._options,
            style: Object.assign({
              display: _options.inline ? 'inline-block' : 'block',
              marginLeft: '3px',
              marginRight: '3px',
              border:
                selected && !isDisabled
                  ? '2px solid var(--w-e-textarea-selected-border-color)' // wangEditor 提供了 css var https://www.wangeditor.com/v5/theme.html
                  : '2px solid transparent',
              borderRadius: '3px'
            }, _options.style),
            dataset: Object.assign({
              [toDatasetKey(datasetKey.value)]: value
            }, _options.dataset),
            hook: {
              update(vnode) {
                if (!vnode.elm) {
                  return;
                }
                const el = vnode.elm as HTMLElement;
                const instance = elMap.get(el);
                if (instance && typeof instance.update === 'function') {
                  instance.update({
                    disabled: editor.isDisabled(),
                    selected: DomEditor.isNodeSelected(editor, elem)
                  });
                }
              },
              insert(vnode) {
                if (!vnode.elm) {
                  return;
                }
                const el = vnode.elm as HTMLElement;
                const instance = cmpCreator({
                  disabled: editor.isDisabled(),
                  selected: DomEditor.isNodeSelected(editor, elem),
                  defaultValue: value,
                  updateValue: value => {
                    const location = DomEditor.findPath(editor, elem);
                    SlateTransforms.setNodes<CustomWangElement>(editor, {
                      value
                    }, {
                      at: location
                    });
                  }
                });
                el.innerHTML = '';
                const dom = instance.getEl();
                if (dom) {
                  el.appendChild(dom);
                }
                elMap.set(el, instance);
              },
              destroy(vnode) {
                if (!vnode.elm) {
                  return;
                }
                const el = vnode.elm as HTMLElement;
                const instance = elMap.get(el);
                if (instance) {
                  instance.unmount();
                }
                elMap.delete(el);
              }
            }
          },
        );
        return attachVnode;
      }
    }],
    elemsToHtml: [{
      type: tag,
      elemToHtml
    }],
    parseElemsHtml: [{
      selector: `${datasetKey.tag}[${datasetKey.elementType}="${tag}"]`,
      parseElemHtml
    }] 
  };
}