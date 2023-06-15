import { normalizeOptions } from '@/options';

describe('test normalizeOptions', () => {
  test('null options', () => {
    const result = normalizeOptions();
    expect(result).toEqual({
      tag: 'span',
      inline: true,
      props: {
        contentEditable: false
      }
    });
  });
  test('empty options', () => {
    const result = normalizeOptions({});
    expect(result).toEqual({
      tag: 'span',
      inline: true,
      props: {
        contentEditable: false
      }
    });
  });
  test('div tag', () => {
    const result = normalizeOptions({
      tag: 'div'
    });
    expect(result).toEqual({
      tag: 'div',
      inline: true,
      props: {
        contentEditable: false
      }
    });
  });

  test('inline options', () => {
    const result = normalizeOptions({
      inline: false
    });
    expect(result).toEqual({
      tag: 'span',
      inline: false,
      props: {
        contentEditable: false
      }
    });
  });
  test('props.contentEditable = true', () => {
    const result = normalizeOptions({
      props: {
        contentEditable: true
      }
    });
    expect(result).toEqual({
      tag: 'span',
      inline: true,
      props: {
        contentEditable: true
      }
    });
  });
  test('other props', () => {
    const result = normalizeOptions({
      props: {
        width: '12px',
        height: '24px'
      }
    });
    expect(result).toEqual({
      tag: 'span',
      inline: true,
      props: {
        contentEditable: false,
        width: '12px',
        height: '24px'
      }
    });
  });
  test('other options', () => {
    const result = normalizeOptions({
      props: {
        width: '12px',
        height: '24px'
      },
      ns: 'http://example.com'
    });
    expect(result).toEqual({
      tag: 'span',
      inline: true,
      props: {
        contentEditable: false,
        width: '12px',
        height: '24px'
      },
      ns: 'http://example.com'
    });
  });
  test('mixin test', () => {
    const result = normalizeOptions({
      tag: 'div',
      inline: false,
      props: {
        width: '12px',
        height: '24px'
      },
      ns: 'http://example.com'
    });
    expect(result).toEqual({
      tag: 'div',
      inline: false,
      props: {
        contentEditable: false,
        width: '12px',
        height: '24px'
      },
      ns: 'http://example.com'
    });
  });
});