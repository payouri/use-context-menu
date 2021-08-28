import { TouchEvent, MouseEvent } from 'react';
import { Coordinates } from '../../types';

export const getCoordinates = (
  event: TouchEvent | MouseEvent,
  [posX, posY]: Coordinates,
): Coordinates => [
  (event as MouseEvent).clientX
        || ((event as TouchEvent).touches
          && (event as TouchEvent).touches[0].pageX) - posY,
  (event as MouseEvent).clientY
        || ((event as TouchEvent).touches
          && (event as TouchEvent).touches[0].pageY) - posX,
];
