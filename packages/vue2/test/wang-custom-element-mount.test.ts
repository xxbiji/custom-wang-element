import { WangCustomElementMount } from '@/wang-custom-element-mount';
import { mountInstanceCreator } from '@custom-wang-element/vue-tools';
import CountBtn from '../test-components/count-btn.vue';
import Vue from 'vue';


describe('WangCustomElementMounter', () => {
  test('mounted cmp', async () => {
    const baseDiv = document.createElement('div');
    new Vue({
      ...WangCustomElementMount as Record<string, any>
    }).$mount(baseDiv);
    const mountedCmp = await mountInstanceCreator(CountBtn, {
      disabled: false,
      selected: false,
      updateValue(){},
      defaultValue: ''
    });
    expect(mountedCmp.getEl()?.querySelector('button')?.disabled).toBe(false);
    mountedCmp.update({
      selected: false,
      disabled: true
    });
    await Promise.resolve(); 
    expect(mountedCmp.getEl()?.querySelector('button')?.disabled).toBe(true);
  });
});

