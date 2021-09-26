import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
} from 'react';
import { buildMenuTriggerHook } from '../createMenuTriggerHook';
import { KeyCodes } from '../enums';
import { focusElement, getMenuPosition, getRTLMenuPosition } from '../helpers';
import { contextMenuReducer, initialState } from '../reducer';
import { Coordinates } from '../types';
import { baseStyles } from './constants';
import {
  UseContextMenuHook as HookShape,
  UseContextMenuProps as Props,
} from './types';

export type { UseContextMenuProps, UseContextMenuHook } from './types';

export function useContextMenu<
  T extends HTMLElement = HTMLElement,
  I extends HTMLElement = HTMLElement
>({
  rtl = false,
  handleElementSelect = focusElement,
  hideOnScroll = false,
}: Props = {}): HookShape<T, I> {
  const menuRef = useRef<T>(null);
  const selectableRef = useRef<I[]>([]);

  const [
    { collectedData, style, isVisible, coordinates, selectedIndex },
    dispatch,
  ] = useReducer(contextMenuReducer, initialState);
  const isVisibleRef = useRef<boolean>(false);
  isVisibleRef.current = isVisible;

  const hideMenu = useCallback(() => {
    dispatch({
      type: 'updateState',
      payload: {
        isVisible: false,
        selectedIndex: -1,
      },
    });
  }, []);

  const triggerVisible = useCallback((coords: Coordinates, data: unknown) => {
    dispatch({
      type: 'updateState',
      payload: {
        isVisible: true,
        selectedIndex: -1,
        coordinates: coords,
        collectedData: data,
      },
    });
  }, []);

  const markSelectable = (el: I): I[] => {
    selectableRef.current = el === null ? [] : [...selectableRef.current, el];
    return selectableRef.current;
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent): void => {
      if (
        isVisibleRef.current &&
        menuRef.current &&
        !menuRef.current.contains(e.target as HTMLElement)
      ) {
        hideMenu();
        document.removeEventListener('mousedown', handleOutsideClick);
        document.removeEventListener('touchstart', handleOutsideClick);
      }
    };
    const handleKeyNavigation = (e: KeyboardEvent): void => {
      switch (e.key) {
        case KeyCodes.TAB:
          hideMenu();
          break;
        case KeyCodes.ESCAPE:
          e.preventDefault();
          hideMenu();
          break;
        case KeyCodes.UP_ARROW:
          e.preventDefault();
          if (selectedIndex > 0) {
            dispatch({ type: 'setSelectedIndex', payload: (s) => s - 1 });
            handleElementSelect(selectableRef.current[selectedIndex - 1]);
          }
          break;
        case KeyCodes.DOWN_ARROW:
          e.preventDefault();
          if (selectedIndex + 1 < selectableRef.current.length) {
            dispatch({ type: 'setSelectedIndex', payload: (s) => s + 1 });
            handleElementSelect(selectableRef.current[selectedIndex + 1]);
          }
          break;
        case KeyCodes.ENTER:
          if (selectedIndex !== -1) {
            selectableRef.current[selectedIndex].click();
          }
          hideMenu();
          break;
        default:
      }
    };
    if (isVisible) {
      document.addEventListener('mousedown', handleOutsideClick, {
        passive: true,
        capture: true,
      });
      document.addEventListener('touchstart', handleOutsideClick, {
        passive: true,
        capture: true,
      });
      if (hideOnScroll) {
        document.addEventListener('scroll', hideMenu, {
          once: true,
        });
      }
      document.addEventListener('keydown', handleKeyNavigation);
    }
    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('scroll', hideMenu);
      document.removeEventListener('keydown', handleKeyNavigation);
    };
  }, [
    menuRef,
    hideMenu,
    selectedIndex,
    selectableRef,
    handleElementSelect,
    isVisible,
    hideOnScroll,
  ]);

  useEffect(() => {
    if (isVisible && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const { top, left } = rtl
        ? getRTLMenuPosition(rect, coordinates)
        : getMenuPosition(rect, coordinates);
      dispatch({
        type: 'updateStyle',
        payload: {
          transform: `translate3d(${left}px, ${top}px, 0)`,
          opacity: 1,
          pointerEvents: 'auto',
        },
      });
    } else {
      const { transform } = style;

      dispatch({
        type: 'setStyle',
        payload: {
          ...baseStyles,
          ...(transform ? { transform } : {}),
        },
      });
    }
  }, [menuRef, isVisible, coordinates, rtl]);

  const menuProps = {
    style,
    ref: menuRef,
    role: 'menu',
    tabIndex: 0,
    onContextMenu: (e: SyntheticEvent): void => e.preventDefault(),
    'aria-hidden': !isVisible,
  };

  const menuItemProps = {
    ref: markSelectable,
    role: 'menuitem',
    tabIndex: -1,
  };

  return {
    menuProps,
    menuItemProps,
    useContextTrigger: buildMenuTriggerHook(triggerVisible),
    hideMenu,
    setVisible: (val: boolean) => {
      dispatch({
        type: 'setIsVisible',
        payload: val,
      });
    },
    setCoordinates: (coordinates: [number, number]) => {
      dispatch({
        type: 'setCoordinates',
        payload: coordinates,
      });
    },
    state: {
      data: collectedData,
      isVisible,
      coords: coordinates,
    },
  };
}
