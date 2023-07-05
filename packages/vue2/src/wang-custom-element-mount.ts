import { ComponentOptions, default as Vue } from 'vue';
import { CmpUpdateOptions } from '@custom-wang-element/core';
import { CmpMount } from './cmp-mount';
import { MID, MountInstance, MountOptions, registerInstance, unmountInstance } from '@custom-wang-element/vue-tools';
import { errLog } from '@custom-wang-element/common';

let _gid = 0;

interface EMountOptions extends MountOptions {
  id: MID
}

type WangCustomElementMounterData = {
  elementList: EMountOptions[]
}

export const WangCustomElementMount: ComponentOptions<Vue & WangCustomElementMounterData> = {
  data() {
    return {
      elementList: []
    };
  },
  created() {
    registerInstance(this as MountInstance);
  },
  beforeDestroy() {
    unmountInstance();
  },
  methods: {
    mountElement(options: MountOptions) {
      _gid += 1;
      const id = 'wcem-id-' + _gid;
      this.elementList.push({ ...options, id });
      return id;
    },
    updateElement(id: MID, options: CmpUpdateOptions) {
      const index = this.elementList.findIndex((op: EMountOptions) => op.id === id);
      if (index === -1) {
        errLog(`MID(${id}) is not find in element list`);
        return;
      }
      this.elementList[index].options.selected = options.selected;
      this.elementList[index].options.disabled = options.disabled;
    },
    unmountElement(id: MID) {
      const index = this.elementList.findIndex((op: EMountOptions) => op.id === id);
      if (index === -1) {
        errLog(`MID(${id}) is not find in element list`);
        return;
      }
      this.elementList.splice(index, 1);
    }
  },
  render(h) {
    const { elementList } = this as WangCustomElementMounterData;
    return h('div', {
      class: 'wang-custom-element-mount'
    }, elementList.map((op: EMountOptions) => h(CmpMount, {
      attrs: { ...op }
    })));
  }
};
