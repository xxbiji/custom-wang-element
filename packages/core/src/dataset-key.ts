export default {
  elementType: 'data-w-e-type',
  value: 'data-value',
  tag: 'span'
};

export function toDatasetKey(key: string): string {
  const prefix = 'data-';
  if (key === 'data') {
    return '';
  }
  if (key.startsWith(prefix)) {
    key = key.slice(prefix.length);
  }
  if (key === '') {
    return '';
  }
  const result:string[] = [];
  key.split('-').forEach(c => {
    if (c === '') {
      result.push('-');
      return;
    }
    if (/^[0-9]/.test(c)) {
      result.push('-');
      result.push(c);
      return;
    }
    if (result.length === 0) {
      result.push(c);
      return;
    }
    result.push(c[0].toUpperCase() + c.slice(1));
  });
  return result.join('');
}