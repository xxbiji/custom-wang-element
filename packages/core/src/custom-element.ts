type EmptyText = {
  text: ''
}

export type CustomWangElement = {
  type: string
  value: string
  children: EmptyText[]
}

function valueToString(value: any): string {
  if (typeof value === 'string') {
    return value;
  }
  if (!value && (typeof value === 'undefined' || typeof value === 'object')) {
    return '';
  }
  if (typeof value === 'function') {
    return '';
  }
  return JSON.stringify(value);
}

export function customWangElement(type: string, value: any): CustomWangElement {
  return {
    type,
    value: valueToString(value),
    children: [{text: ''}]
  };
}