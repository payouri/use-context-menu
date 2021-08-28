import { CSSProperties, RefObject, SyntheticEvent } from 'react';
import { UseMenuTriggerHook } from '../createMenuTriggerHook';
import { ContextTriggerConfig } from '../types';

export type BindMenuProps<T extends HTMLElement = HTMLElement> = {
  style: CSSProperties
  ref: RefObject<T>
  role: string
  tabIndex: number
  onContextMenu: (e: SyntheticEvent) => void
  'aria-hidden': boolean
};

export type BindMenuItemProps<I extends HTMLElement = HTMLElement> = {
  ref: (el: I) => I[]
  role: string
  tabIndex: number
};

export type UseContextMenuHook<
    M extends HTMLElement = HTMLElement,
    I extends HTMLElement = HTMLElement,
> = {
  menuProps: BindMenuProps<M>
  menuItemProps: BindMenuItemProps<I>
  useContextTrigger: (
    config?: Partial<ContextTriggerConfig>
  ) => UseMenuTriggerHook
  state: {
    data: unknown
    isVisible: boolean
    coords: [number, number]
  }
  hideMenu: () => void
  setVisible: (val: boolean) => void
  setCoordinates: (coordinates: [number, number]) => void
};

export type UseContextMenuProps = {
  rtl?: boolean
  handleElementSelect?: (el: HTMLElement) => void
  hideOnScroll?: boolean
};
