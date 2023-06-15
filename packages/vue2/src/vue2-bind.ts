import {
  ICmp,
  createCustomElement,
  CmpCreator,
  CmpCreatorOptions,
  ElemOption,
  CmpUpdateOptions
} from '@custom-wang-element/core';
import Vue from 'vue';

export type VueCmp = Record<string, any>

export function vueCmpCreator(cmp: VueCmp): CmpCreator {
  return (options: CmpCreatorOptions): ICmp => {
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
  };
}

export function createCustomElementByVue2(
  tag: string,
  cmp: VueCmp,
  options?: Partial<ElemOption>
) {
  return createCustomElement(tag, vueCmpCreator(cmp), options);
}
