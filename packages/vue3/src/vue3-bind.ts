import {
  CmpCreatorOptions,
  createCustomElement,
  ElemOption,
  ICmp
} from '@custom-wang-element/core';
import { createApp, App, ComponentPublicInstance } from 'vue';
import WrapperComponent, { WrapperMethods } from './wrapper-component';
import { VueCmp, vueCmpCreator } from '@custom-wang-element/vue-tools';

export function createCustomElementByVue3(
  tag: string,
  cmp: VueCmp,
  options?: Partial<ElemOption>
) {
  return createCustomElement(tag, vueCmpCreator(cmp, defaultICmpCreator), options);
}

export function defaultICmpCreator(cmp: VueCmp, options: CmpCreatorOptions): ICmp {
  let app: App<Element> | null = createApp(WrapperComponent, {
    options,
    cmp
  });
  let instance: ComponentPublicInstance<WrapperMethods> | null = app.mount(document.createElement('div')) as ComponentPublicInstance<WrapperMethods>;
  return {
    getEl() {
      if (!instance) {
        return null;
      }
      return instance.$el;
    },
    unmount() {
      if (app) {
        app.unmount();
      }
      app = null;
      instance = null;
    },
    update(options) {
      if (!instance) {
        return;
      }
      instance.update(options);
    }
  };
}
