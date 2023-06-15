import { createEditor, createToolbar, IDomEditor } from '@wangeditor/editor';
import './count-btn';

const editorConfig = {
  placeholder: 'Type here...',
  onChange(editor: IDomEditor) {
    const html = editor.getHtml();
    console.log('editor content', html);
    // 也可以同步到 <textarea>
  }
};

const editor = createEditor({
  selector: '#editor-container',
  html: '<p>这是一个计数器<span data-w-e-type="countbtn" data-value="8"></span></p>',
  config: editorConfig,
  mode: 'default' // or 'simple'
});


const toolbarConfig = {};

const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: {
    insertKeys: {
      index: 4,
      keys: ['countbtn-menu']
    }
  },
  mode: 'default' // or 'simple'
});

const editorCtrl = document.querySelector('#editor-state-controller');
if (editorCtrl) {
  (editorCtrl as HTMLElement).onclick = function () {
    if (editor.isDisabled()) {
      editor.enable();
    } else {
      editor.disable();
    }
  };
}