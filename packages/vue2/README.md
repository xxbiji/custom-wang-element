## 简介

`@custom-wang-element/vue2`是`@custom-wang-element/core`的`vue 2.0`版本绑定。得益于`ICmp`的抽象接口，从而基于`createCustomElement`方法，定义了`createCustomElementByVue2`的方法。

`createCustomElementByVue2`对于`createCustomElement`方法的区别在于第二个参数的入参不再是`CmpCreator`，而是需要绑定的`vue2`组件。

`createCustomElement`的具体用法，查看`@custom-wang-element/core`的[说明文档](https://github.com/xxbiji/custom-wang-element/blob/master/packages/core/README.md)。

## 安装

`@custom-wang-element/vue2`依赖`@custom-wang-element/core`和`wangEditor`。

```shell
npm install @wangeditor/editor @custom-wang-element/core --save
```

然后再安装`@custom-wang-element/vue2`

```shell
npm install @custom-wang-element/vue2 --save
```

## 使用

在初始化`wangEditor`前，使用`createCustomElementByVue2`创建一个`module`并在注册

```js
import CountBtn from '@/components/count-btn.vue' // 需要注册的vue组件
import { Boot } from '@wangeditor/editor'
import { createCustomElementByVue2 } from '@custom-wang-element/vue2'

// 使用createCustomElementByVue2创建一个wangEdior module，并注册
Boot.registerModule(createCustomElementByVue2('countbtn', CountBtn))
```

由于是基于`@custom-wang-element/core`，可以直接使用其内置的`customWangElement`方法创建一个`SlateElement`

```js
import { customWangElement } from '@custom-wang-element/core'

customWangElement('countbtn', '0')
```

具体使用案例可以[点击这个](https://github.com/xxbiji/custom-wang-element/tree/master/packages/vue2/example)查看
