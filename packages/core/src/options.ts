import { VNodeData } from 'snabbdom';

export type ElemOption = {
  tag: string
  inline: boolean
  props: Record<string, any>,
} & VNodeData

export function normalizeOptions(options?: Partial<ElemOption>): ElemOption {
  const result: ElemOption = {
    tag: 'span',
    inline: true,
    props: {
      contentEditable: false
    }
  } as ElemOption;
  if (!options) {
    return result;
  }
  if (typeof options.tag === 'string' && options.tag.length > 0) {
    result.tag = options.tag;
  }
  if (typeof options.inline === 'boolean') {
    result.inline = options.inline;
  }
  if (options.props && typeof options.props === 'object') {
    result.props = Object.assign(result.props, options.props);
  }
  return Object.assign({}, options, result);
}
