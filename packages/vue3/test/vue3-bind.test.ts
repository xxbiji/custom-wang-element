import { defaultICmpCreator } from '@/vue3-bind';
import CountBtn from '../test-components/count-btn.vue';

describe('defaultICmpCreator', () => {
  test('test getEl', () => {
    const cmp = defaultICmpCreator(CountBtn, {
      selected: false,
      defaultValue: '20',
      disabled: false,
      updateValue() {}
    });
    expect(cmp.getEl()?.querySelector('[data-test=count]')?.lastChild?.nodeValue).toBe('20');
  });

  test('test unmount', () => {
    const cmp = defaultICmpCreator(CountBtn, {
      selected: false,
      defaultValue: '20',
      disabled: false,
      updateValue() {}
    });
    cmp.unmount();
    expect(cmp.getEl()).toBe(null);
  });

  test('test update', async () => {
    const cmp = defaultICmpCreator(CountBtn, {
      selected: false,
      defaultValue: '20',
      disabled: false,
      updateValue() {}
    });
    expect(cmp.getEl()?.querySelector('button')?.disabled).toBe(false);
    cmp.update({
      selected: false,
      disabled: true
    });
    await Promise.resolve(); 
    expect(cmp.getEl()?.querySelector('button')?.disabled).toBe(true);
  });
});
