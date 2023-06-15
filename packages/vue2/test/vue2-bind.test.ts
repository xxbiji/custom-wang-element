import { vueCmpCreator } from '@/vue2-bind';
import CountBtn from '../test-components/count-btn.vue';

describe('test vueCmpCreator', () => {
  test('test getEl', () => {
    const creator = vueCmpCreator(CountBtn);
    const cmp = creator({
      selected: false,
      defaultValue: '20',
      disabled: false,
      updateValue() {}
    });
    expect(cmp.getEl()?.querySelector('span')?.lastChild?.nodeValue).toBe('20');
  });
  
  test('test unmount', () => {
    const creator = vueCmpCreator(CountBtn);
    const cmp = creator({
      selected: false,
      defaultValue: '20',
      disabled: false,
      updateValue() {}
    });
    cmp.unmount();
    expect(cmp.getEl()).toBe(null);
  });

  test('test update', async () => {
    const creator = vueCmpCreator(CountBtn);
    const cmp = creator({
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
    await timeout(); 
    expect(cmp.getEl()?.querySelector('button')?.disabled).toBe(true);
  });
});

function timeout(time: number = 200): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}