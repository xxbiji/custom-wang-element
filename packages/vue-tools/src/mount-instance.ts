import { CmpCreatorOptions, ICmp } from '@custom-wang-element/core';
import { MountInstance, VueCmp } from './types';

let _instance: MountInstance | null = null;

export function registerInstance(instance: MountInstance) {
  _instance = instance;
}

export function unmountInstance() {
  _instance = null;
}

export function hasInstance(): boolean {
  return _instance !== null;
}

export function isInstance(instance: MountInstance): boolean {
  return _instance === instance;
}

export function mountInstanceCreator(cmp: VueCmp, options: CmpCreatorOptions): Promise<ICmp> {
  return new Promise<ICmp>((resolve, reject) => {
    if (_instance === null) {
      reject('WangCustomElementMounter don\'t mounted');
      return;
    }
    const id = _instance.mountElement({
      cmp, options,
      callback: el => resolve({
        getEl() {
          return el;  
        },
        update(options) {
          _instance?.updateElement(id, options);
        },
        unmount() {
          _instance?.unmountElement(id); 
        }
      })
    });
  });
}