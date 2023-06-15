import datasetKey from '@/dataset-key';
import { CmpCreatorOptions, CmpUpdateOptions, createCustomElement, ICmp } from '@/create-custom-element';
import createEditor from './utils/create-editor';
import { customWangElement } from '@/custom-element';
import { h, init } from 'snabbdom';

class TestCmp implements ICmp {
  value: string;
  selected: boolean;
  disabled: boolean;
  updateValue: (value: string) => void;
  isUnmounted: boolean = false;
  constructor(options: CmpCreatorOptions) {
    this.value = options.defaultValue;
    this.selected = options.selected;
    this.disabled = options.disabled;
    this.updateValue = options.updateValue;
  }
  update(options: CmpUpdateOptions): void {
    this.selected = options.selected;
    this.disabled = options.disabled;
  }
  getEl(): HTMLElement {
    const d = document.createElement('div');
    d.innerHTML = this.value;
    return d;
  }
  unmount(): void {
    this.isUnmounted = true;
  }
}

function testCmpCreator(options: CmpCreatorOptions): ICmp {
  return new TestCmp(options);
}

describe('test createCustomElement', () => {
  test('test type', () => {
    const module = createCustomElement('simple', testCmpCreator);
    // expect(plugin)
    expect(module.elemsToHtml[0].type).toBe('simple');
    expect(module.parseElemsHtml[0].selector).toBe(`span[${datasetKey.elementType}="simple"]`);
    expect(module.renderElems[0].type).toBe('simple');
    
    const editor = module.editorPlugin(createEditor());
    const elem = customWangElement('simple', '');
    expect(editor.isInline(elem)).toBe(true);
    expect(editor.isVoid(elem)).toBe(true);
  });

  test('test plugin', () => {
    const module = createCustomElement('simple', testCmpCreator);
    const editor = module.editorPlugin(createEditor());
    const elem = customWangElement('simple', '');

    expect(editor.isInline(elem)).toBe(true);
    expect(editor.isVoid(elem)).toBe(true);
  });
  test('test inline options', () => {
    const module = createCustomElement('simple', testCmpCreator, {
      inline: false
    });
    const editor = module.editorPlugin(createEditor());
    const elem = customWangElement('simple', '');
    expect(editor.isInline(elem)).toBe(false);
  });

  test('test vnode', async () => {
    const module = createCustomElement('simple', testCmpCreator);

    const editor = module.editorPlugin(createEditor());
    const elem = customWangElement('simple', 'value');

    const vnode = module.renderElems[0].renderElem(elem, [], editor);

    expect(vnode.sel).toBe('span');
    expect(vnode.data?.dataset?.value).toBe('value');
    expect(vnode.data?.props?.contentEditable).toBe(false);

  });
  test('test vnode 2', async () => {
    const module = createCustomElement('simple', testCmpCreator, {
      tag: 'div',
      inline: false,
      props: {
        contentEditable: true,
        width: '12px'
      }
    });

    const editor = module.editorPlugin(createEditor());
    const elem = customWangElement('simple', '12345');

    const vnode = module.renderElems[0].renderElem(elem, [], editor);

    expect(vnode.sel).toBe('div');
    expect(vnode.data?.dataset?.value).toBe('12345');
    expect(vnode.data?.props?.contentEditable).toBe(true);
    expect(vnode.data?.props?.width).toBe('12px');

  });

  test('test icmp insert', async () => {
    let cmp: TestCmp | null = null;
    const module = createCustomElement('simple', (options) => {
      cmp = new TestCmp(options);
      return cmp;
    },);

    const editor = module.editorPlugin(createEditor());
    const elem = customWangElement('simple', '12345');

    const vnode = module.renderElems[0].renderElem(elem, [], editor);
    
    const patch = init([]);
    
    const fragment = document.createElement('div');

    patch(fragment, vnode);

    if (!cmp) {
      expect(false).toBe(true);
      return;
    }
    expect((cmp as TestCmp).value).toBe('12345');
  });
});
