## 简介

`custom-wang-element`是一个快速定义`wangEditor`自定义`element`的库，外部组件只要实现`ICmp`接口，既可以在对应的mvvm框架中接入各自的组件。

## 安装

`custom-wang-element`依赖`wangEditor`，需要提前安装`wangEditor`，已安装可以跳过

```shell
npm install @wangeditor/editor --save
```

然后安装`custom-wang-element`

```shell
npm install @custom-wang-element/core --save
```

## 使用

在初始化`wangEditor`前，使用`createCustomElement`创建一个`module`并在注册：

```js
import { createCustomElement } from "@custom-wang-element/core";
import { Boot } from "@wangeditor/editor";

// 注册一个组件
Boot.registerModule(createCustomElement('countbtn', countBtnCreator))
```

上面的例子中，`'countbtn'`是我们创建自定义元素的tag，需要全局唯一，不可重复注册，`countBtnCreator`是一个`CmpCreator`函数，`CmpCreator`函数是一个`ICmp`的构建函数，`countBtnCreator`的作用就是构建一个`countBtn`组件，提供给`wangEditor`使用。代码大致如下，省略具体实现：

```js
function countBtnCreator(options: CmpCreatorOptions): ICmp {
  let wrapper = document.createElement("div")
  return {
    getEl() {
      return wrapper
    },
    update(options) {
    },
    unmount() {
      wrapper = null
    }
  }
}
```

注册完组件后，即可在`wangEditor`中使用，正常我们是在自定义菜单中插入一个自定义元素：

```js
import { customWangElement } from "@custom-wang-element/core";
import { Boot } from "@wangeditor/editor";
class CountBtnMenu {
  constructor() {
    this.title = '计数器'
    this.tag = 'button'
  }
  getValue(editor) {
    return false
  }
  isActive(editor) {
    return true
  }
  isDisabled(editor) {
    return editor.isDisabled()
  };
  exec(editor, value) {
    // 这里插入我们的自定元素，这里我们提供了customWangElement函数来创建一个SlateElement
    editor.insertNode(customWangElement('countbtn', '0'))
  };
  
}

Boot.registerMenu({
  key: 'countbtn-menu', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new CountBtnMenu() // 把 `YourMenuClass` 替换为你菜单的 class
  },
})
```

在上面代码中，我们在`exec`方法中插入一个`SlateElement`来添加我们的自定义组件。由于我们的自定义元素的`SlateElement`类型是`CustomWangElement`，我们提供了`customWangElement`来快速创建：

```js
import { customWangElement } from "@custom-wang-element/core";

customWangElement('countbtn', '0')
```

具体的使用，可以[查看案例](https://github.com/xxbiji/custom-wang-element/tree/master/packages/core/example)

## 内置api和接口类型

### createCustomElement

```typescript
function createCustomElement(tag: string, cmpCreator: CmpCreator, options?: Partial<ElemOption>): CustomElementModule
```

`tag`是`wangEditor`的组件名，必须唯一

`cmpCreator`是外部组件构造器，返回一个`ICmp`对象

`options`是自定义初始化`wangEditor`组件根节点`snabbdom`的vnode参数

只需实现`CmpCreator`，即可在其他mvvm框架中，接入其自定义组件。


### CmpCreator

```typescript
type CmpCreator = (options: CmpCreatorOptions) => ICmp
```

### CmpCreatorOptions

```ts
export type CmpCreatorOptions = CmpUpdateOptions & {
  defaultValue: string,
  updateValue: (arg: string) => void
}
```

### CmpUpdateOptions

```ts
export type CmpUpdateOptions = {
  disabled: boolean
  selected: boolean
}
```

# ICmp

```typescript
interface ICmp {
  getEl(): (Element | null)
  unmount(): void
  update(options: CmpUpdateOptions): void
}
```

`ICmp.getEl`是用户获取插入组件的`HTMLElement`节点。

`ICmp.unmount`是自定义组件在`wangEditor`卸载该节点时的钩子函数。

`ICmp.update`是在编辑器`disabled`和`selected`更新的时候，通知外部组件更新状态的钩子。

### ElemOption

```ts
import { VNodeData } from 'snabbdom'

type ElemOption = {
  tag: string
  inline: boolean
  props: Record<string, any>,
} & VNodeData
```

`tag`是生成`snabbdom`Vnode是的根节点标签，默认是`'span'`

`inline`说明只定义节点是行内元素，而非块元素，默认是`true`

`props`是传入`snabbdom`Vnode根节点的props数据，默认是`{ contentEditable: false }`

`VNodeData`请查看[`snabbdom`文档](https://github.com/snabbdom/snabbdom)

### customWangElement

创建一个`SlateElement`，作用是创建一个`createCustomElement`注册后的`Slate`节点

```ts
function customWangElement(type: string, value: any): CustomWangElement
```

第一个参数`type`是调用`createCustomElement`的tag，也就是自定义节点的tag

第二个参数`value`是自定义元素的初始数据，所有非`string`类型数据，都会被`JSON.stringify`处理。`null`和`undefined`会转成空字符串`''`。

## 其他mvvm框架的绑定

虽然`custom-wang-element`提供了抽象的接口，可以自行接入其他mvvm框架中，但是需要自己实现`CmpCreator`，确实有点麻烦，这里我们提供了如下框架的版本的`CmpCreator`绑定：

- [vue2](https://github.com/xxbiji/custom-wang-element/blob/master/packages/vue2/README.md)
- [vue3](https://github.com/xxbiji/custom-wang-element/blob/master/packages/vue3/README.md)
