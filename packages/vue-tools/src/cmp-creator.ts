import { CmpCreator, CmpCreatorOptions, ICmp } from '@custom-wang-element/core';
import { errLog } from '@custom-wang-element/common';
import { VueCmp } from './types';
import { mountInstanceCreator } from './mount-instance';

export type DefaultICmpCreator = (cmp: VueCmp, options: CmpCreatorOptions) => ICmp

export function vueCmpCreator(cmp: VueCmp, defaultICmpCreator: DefaultICmpCreator): CmpCreator {
  return (options: CmpCreatorOptions): ICmp | Promise<ICmp> => {
    return mountInstanceCreator(cmp, options).catch(err => {
      errLog(err);
      return defaultICmpCreator(cmp, options);
    });
  };
}
