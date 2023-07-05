import { CmpCreatorOptions, CmpUpdateOptions } from '@custom-wang-element/core';

export type VueCmp = Record<string, any>;

export type MID = string

export interface MountOptions {
  cmp: VueCmp
  options: CmpCreatorOptions
  callback: (el: Element) => void
}

export interface MountInstance {
  mountElement(options: MountOptions): MID
  updateElement(mid: MID, options: CmpUpdateOptions): void
  unmountElement(mid: MID): void
}