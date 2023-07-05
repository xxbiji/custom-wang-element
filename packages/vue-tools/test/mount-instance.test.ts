import { registerInstance, unmountInstance, hasInstance, isInstance, mountInstanceCreator } from '@/mount-instance';
import { MountInstance, MountOptions, VueCmp } from '@/types';
import { CmpUpdateOptions } from '@custom-wang-element/core';

class TestMountInstance implements MountInstance {
  id: string = 'test_id';
  cmp: VueCmp = {};
  selected: boolean = false;
  disabled: boolean = false;
  defaultValue: string = '';
  updateValue: (update: string) => void = () => {};
  isMounted: boolean = false;
  mountElement(options: MountOptions): string {
    this.cmp = options.cmp;
    this.selected = options.options.selected;
    this.disabled = options.options.disabled;
    this.defaultValue = options.options.defaultValue;
    this.updateValue = options.options.updateValue;
    this.isMounted = true;
    options.callback(document.createElement('div'));
    return this.id;
  }
  updateElement(mid: string, options: CmpUpdateOptions): void {
    this.selected = options.selected;
    this.disabled = options.disabled;
  }
  unmountElement(mid: string): void {
    this.isMounted = false;
  }
}

describe('test instance', () => {
  test('register instance', () => {
    expect(hasInstance()).toBe(false); 
    const mi = new TestMountInstance();
    registerInstance(mi);
    expect(hasInstance()).toBe(true); 
    expect(isInstance(mi)).toBe(true);

    unmountInstance();
    expect(hasInstance()).toBe(false); 
  });
});

describe('mountInstanceCreator', () => {
  test('unregister instance', async () => {
    expect.assertions(1);
    await mountInstanceCreator({}, {
      disabled: false,
      selected: false,
      updateValue(){},
      defaultValue: ''
    }).catch(err => {
      expect(err).toBeTruthy();
    });
  });

  test('mounted cmp', async () => {
    const mi = new TestMountInstance();
    registerInstance(mi);
    expect(mi.isMounted).toBe(false);
    const mountedCmp = await mountInstanceCreator({}, {
      disabled: true,
      selected: true,
      updateValue(){},
      defaultValue: 'mounted cmp'
    });
    expect(mountedCmp.getEl()?.tagName).toBe('DIV');
    expect(mi.isMounted).toBe(true);
    expect(mi.defaultValue).toBe('mounted cmp');
    expect(mi.disabled).toBe(true);
    expect(mi.selected).toBe(true);
    mountedCmp.update({
      selected: false,
      disabled: false
    });
    expect(mi.disabled).toBe(false);
    expect(mi.selected).toBe(false);

    mountedCmp.unmount();
    expect(mi.isMounted).toBe(false);
  });
});