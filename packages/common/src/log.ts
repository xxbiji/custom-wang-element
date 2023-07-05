export function errLog(...args: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(...args);
  }
}
