<template>
  <div style="border: 1px solid #ccc">
    <div>
      <button @click="disableEditor">切换编辑器状态</button>
    </div>
    <WangCustomElementMounter />
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import './count-btn-register.ts'
import { WangCustomElementMounter} from '../src/index'

export default {
  name: 'Index',
  components: { Editor, Toolbar, WangCustomElementMounter },
  provide() {
    return {
      globalData: 'parentData'
    }
  },
  data() {
    return {
      editor: null,
      html: '<p>这是一个计数器<span data-w-e-type="countbtn" data-value="8"></span></p>',
      toolbarConfig: {
        insertKeys: {
          index: 4,
          keys: ['countbtn-menu']
        }
      },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default' // or 'simple'
    }
  },
  watch: {
    html() {
      console.log('uodate value:', this.html)
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    disableEditor() {
      const editor = this.editor
      if (editor == null) return
      if (editor.isDisabled())  {
        editor.enable()
      } else {
        editor.disable()
      }
    }
  },
  mounted() {},
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style></style>
