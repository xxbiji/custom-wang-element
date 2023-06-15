import { Boot, IButtonMenu, IDomEditor } from '@wangeditor/editor';
import { CmpCreatorOptions, ICmp, createCustomElement, customWangElement } from '../src/index';

export function countBtnCreator(options: CmpCreatorOptions): ICmp {
  let wrapper: Element | null = document.createElement('div');
  let count = parseInt(options.defaultValue);
  let textEl: HTMLElement | null = document.createElement('span');
  textEl.innerText = count + '';
  textEl.style.padding = '0 10px';

  function updatetTextEl() {
    if (!textEl) {
      return;
    }
    const newText = count + '';
    textEl.innerText = count + '';
    options.updateValue(newText);
  }

  let subBtn: HTMLButtonElement | null = document.createElement('button');
  subBtn.innerText = '-';
  subBtn.onclick = () => {
    count -= 1;
    updatetTextEl();
  };
  subBtn.disabled = options.disabled;
  subBtn.style.width = '25px';

  let addBtn: HTMLButtonElement | null = document.createElement('button');
  addBtn.innerText = '+';
  addBtn.onclick = () => {
    count += 1;
    updatetTextEl();
  };
  addBtn.disabled = options.disabled;
  addBtn.style.width = '25px';

  wrapper.appendChild(subBtn);
  wrapper.appendChild(textEl);
  wrapper.appendChild(addBtn);

  return {
    getEl() {
      return wrapper;
    },
    update(options) {
      if (addBtn) {
        addBtn.disabled = options.disabled;
      }
      if (subBtn) {
        subBtn.disabled = options.disabled;
      }
    },
    unmount() {
      wrapper = null;
      textEl = null;
      subBtn = null;
      addBtn = null;
    }
  };
}

export class CountBtnMenu implements IButtonMenu {
  title: string;
  iconSvg?: string | undefined;
  hotkey?: string | undefined;
  alwaysEnable?: boolean | undefined;
  tag: string;
  width?: number | undefined;
  constructor() {
    this.title = '计数器';
    this.tag = 'button';
  }
  getValue(editor: IDomEditor) {
    return false;
  }
  isActive(editor: IDomEditor) {
    return true;
  }
  isDisabled(editor: IDomEditor) {
    return editor.isDisabled();
  }
  exec(editor: IDomEditor, value: string | boolean) {
    editor.insertNode(customWangElement('countbtn', '0'));
  }
  
}

Boot.registerMenu({
  key: 'countbtn-menu', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new CountBtnMenu(); // 把 `YourMenuClass` 替换为你菜单的 class
  }
});

// 注册一个组件
Boot.registerModule(createCustomElement('countbtn', countBtnCreator));