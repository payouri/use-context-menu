export * from './getMenuPosition';
export * from './getRTLMenuPosition';
export * from './getCoords';
export * from './types';

export const isNumber = (x: unknown): x is number => typeof x === 'number';

export function focusElement<E extends HTMLElement = HTMLElement>(el: E): void {
  el.focus();
}

export function getElementAt<T extends unknown[] = unknown[]>(
  iterable: T,
  n: number,
): T[number] | undefined {
  if (iterable.length === 0) {
    return undefined;
  }
  const i = n % iterable.length;
  return i >= 0 ? iterable[i] : iterable[iterable.length + i];
}
