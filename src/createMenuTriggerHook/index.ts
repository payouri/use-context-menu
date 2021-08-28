import {
  useRef, useCallback, MouseEvent, TouchEvent,
} from 'react';
import { MouseButton } from '../enums';
import { getCoordinates, isNumber } from '../helpers';
import { ContextTriggerConfig, Coordinates } from '../types';
import { defaultConfig } from './constants';
import { TriggerBind, UseMenuTriggerHook } from './types';

export * from './types';
export function buildMenuTriggerHook(
  triggerVisible: (coords: Coordinates, data: unknown) => void,
) {
  return (
    triggerConfig: Partial<ContextTriggerConfig> = {},
  ): UseMenuTriggerHook => {
    const config = { ...defaultConfig, ...triggerConfig };
    const holdToDisplay = {
      ...defaultConfig.holdToDisplay,
      ...triggerConfig.holdToDisplay,
    };
    const touchHandled = useRef<boolean>(false);
    const mouseDownTimeoutId = useRef<number>();
    const touchstartTimeoutId = useRef<number>();

    const handleContextClick = useCallback(
      (event: MouseEvent | TouchEvent) => {
        if (config.disable) return;
        if (config.disableIfShiftIsPressed && event.shiftKey) return;

        if (event.cancelable) {
          event.preventDefault();
        }
        event.stopPropagation();
        triggerVisible(
          getCoordinates(event, [config.posX, config.posY]),
          config.collect(),
        );
      },
      [config],
    );

    const handleMouseDown = useCallback(
      (event: MouseEvent) => {
        if (
          isNumber(holdToDisplay.mouse)
          && holdToDisplay.mouse >= 0
          && event.button === MouseButton.LEFT
        ) {
          event.persist();
          event.stopPropagation();

          mouseDownTimeoutId.current = setTimeout(
            () => handleContextClick(event),
            holdToDisplay.mouse,
          );
        }
      },
      [holdToDisplay, handleContextClick],
    );

    const handleMouseUp = useCallback((event: MouseEvent) => {
      if (event.button === MouseButton.LEFT) {
        clearTimeout(mouseDownTimeoutId.current);
      }
    }, []);

    const handleTouchstart = useCallback(
      (event: TouchEvent) => {
        touchHandled.current = false;

        if (isNumber(holdToDisplay.touch) && holdToDisplay.touch >= 0) {
          event.persist();
          event.stopPropagation();

          touchstartTimeoutId.current = setTimeout(() => {
            handleContextClick(event);
            touchHandled.current = true;
          }, holdToDisplay.touch);
        }
      },
      [handleContextClick, holdToDisplay.touch],
    );

    const handleTouchEnd = useCallback((event: TouchEvent) => {
      if (touchHandled.current && event.cancelable) {
        event.preventDefault();
      }
      clearTimeout(touchstartTimeoutId.current);
    }, []);

    const handleContextMenu = useCallback(
      (event: MouseEvent | TouchEvent) => {
        if (touchstartTimeoutId.current && !config.disable) {
          if (event.cancelable) event.preventDefault();
        } else {
          handleContextClick(event);
        }
      },
      [handleContextClick, config.disable],
    );

    const triggerProps: TriggerBind = {
      onContextMenu: handleContextMenu,
    };

    if (holdToDisplay.mouse !== false) {
      triggerProps.onMouseDown = handleMouseDown;
      triggerProps.onMouseUp = handleMouseUp;
      triggerProps.onMouseOut = handleMouseUp;
    }
    if (holdToDisplay.touch !== false) {
      triggerProps.onTouchStart = handleTouchstart;
      triggerProps.onTouchEnd = handleTouchEnd;
      triggerProps.onTouchCancel = handleTouchEnd;
      triggerProps.onTouchMove = handleTouchEnd;
    }

    return { triggerProps, onTrigger: handleContextClick };
  };
}
