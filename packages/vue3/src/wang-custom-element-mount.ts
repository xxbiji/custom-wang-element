import { defineComponent, h, onBeforeUnmount, ref } from 'vue';
import { CmpMount } from './cmp-mount';
import { MID, MountOptions, registerInstance, unmountInstance } from '@custom-wang-element/vue-tools';
import { errLog } from '@custom-wang-element/common';

interface EMountOptions extends MountOptions {
  id: MID
}

let _gid = 0;

export const WangCustomElementMount = defineComponent({
  setup() {
    const elementList = ref<EMountOptions[]>([]);

    registerInstance({
      mountElement(options) {
        _gid += 1;
        const id = 'wcem-id-' + _gid;
        elementList.value.push({ ...options, id });
        return id;
      },
      unmountElement(mid) {
        const index = elementList.value.findIndex(item => item.id === mid);
        if (index === -1) {
          errLog(`MID(${mid}) is not find in element list`);
          return;
        }
        elementList.value.splice(index, 1);
      },
      updateElement(mid, options) {
        const index = elementList.value.findIndex(item => item.id === mid);
        if (index === -1) {
          errLog(`MID(${mid}) is not find in element list`);
          return;
        }
        elementList.value[index].options.selected = options.selected;
        elementList.value[index].options.disabled = options.disabled;
      }
    });

    onBeforeUnmount(() => {
      unmountInstance();
    });

    return () => (h('div', { class: 'wang-custom-element-mount' }), elementList.value.map(el => h(CmpMount, {
      ...el,
      id: null,
      key: el.id
    })));
  }
});