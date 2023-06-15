import CountBtn from '../test-components/count-btn.vue';
import { Boot, IButtonMenu, IDomEditor } from '@wangeditor/editor';
import { customWangElement } from '@custom-wang-element/core';
import { createCustomElementByVue2 } from '../src';

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

Boot.registerModule(createCustomElementByVue2('countbtn', CountBtn));