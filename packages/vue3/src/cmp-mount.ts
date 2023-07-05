import { defineComponent, getCurrentInstance, h, markRaw, onMounted } from 'vue';

export const CmpMount = defineComponent({
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
  setup(props) {
    const cmp = markRaw(props.cmp);
    onMounted(() => {
      const instance = getCurrentInstance();
      if (
        instance
        && 'ctx' in instance
        && instance.ctx 
        && typeof instance.ctx === 'object' 
        && '$el' in instance.ctx
        && instance.ctx.$el instanceof Element
      ) {
        props.callback(instance.ctx.$el);
      }
    });
    return () => h(cmp, { ...props.options });
  }
});