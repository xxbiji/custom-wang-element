import {
  ICmp,
  createCustomElement,
  CmpCreatorOptions,
  ElemOption,
  CmpUpdateOptions
} from '@custom-wang-element/core';
import Vue from 'vue';
import { VueCmp, vueCmpCreator } from '@custom-wang-element/vue-tools';

export function createCustomElementByVue2(
  tag: string,
  cmp: VueCmp,
  options?: Partial<ElemOption>
) {
  return createCustomElement(tag, vueCmpCreator(cmp, defaultICmpCreator), options);
}

export function defaultICmpCreator(cmp: VueCmp, options: CmpCreatorOptions): ICmp {
  let instance: Vue | null = new Vue({ ...cmp, propsData: options}).$mount();
  return {
    getEl(): Element | null {
      if (!instance) {
        return null;
      }
      return instance.$el;
    },
    unmount() {
      if (instance) {
        instance.$destroy();
      }
      instance = null;
    },
    update(options) {
      (['selected', 'disabled'] as Array<keyof CmpUpdateOptions>).forEach(
        key => {
          if (!instance) {
            return;
          }
          if (key in instance.$props) {
            instance.$set(instance.$props, key, options[key]);
          }
        }
      );
    }
  };
}