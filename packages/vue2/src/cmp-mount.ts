import { MountOptions } from '@custom-wang-element/vue-tools';
import { ComponentOptions, default as Vue } from 'vue';

type CmpMountProp = MountOptions

export const CmpMount: ComponentOptions<Vue & CmpMountProp> = {
  props: {
    cmp: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    },
    callback: {
      type: Function,
      default() {}
    }
  },
  mounted() {
    const { callback } = this as CmpMountProp;
    if (typeof callback === 'function') {
      callback((this as Vue).$el);
    }
  },
  render(h) {
    const { cmp, options } = this as CmpMountProp;
    return h(cmp, {
      attrs: { ...options }
    });
  }
};
