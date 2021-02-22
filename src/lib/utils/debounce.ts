export function debounce<T extends (this: any, ...args: any[]) => any>(
  time: number,
  fn: T
): T {
  let timer: number;

  return function(...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), time);
  } as T;
}
