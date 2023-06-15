import { CmpCreatorOptions, CmpUpdateOptions } from '@custom-wang-element/core';
import { defineComponent, h, markRaw, ref } from 'vue';

export interface WrapperMethods {
  update(options: CmpUpdateOptions): void
}

export default defineComponent({
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    cmp: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, context) {
    const options = props.options as CmpCreatorOptions;
    const cmp = markRaw(props.cmp);
    const selected = ref<boolean>(options.selected);
    const disabled = ref<boolean>(options.disabled);
    const { defaultValue, updateValue } = options;

    context.expose({
      update(options: CmpUpdateOptions) {
        selected.value = options.selected;
        disabled.value = options.disabled;
      }
    });
    return () => {
      return h(cmp, {
        selected: selected.value,
        disabled: disabled.value,
        defaultValue,
        updateValue
      });
    };
  }
});
