import { GetPositionFunc } from '../types';

export const getRTLMenuPosition: GetPositionFunc = (rect, [x, y]) => {
  const menuStyles = {
    top: y,
    left: x,
  };

  const { innerWidth, innerHeight } = window;

  // Try to position the menu on the left side of the cursor
  menuStyles.left = x - rect.width;

  if (y + rect.height > innerHeight) {
    menuStyles.top -= rect.height;
  }

  if (menuStyles.left < 0) {
    menuStyles.left += rect.width;
  }

  if (menuStyles.top < 0) {
    menuStyles.top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
  }

  if (menuStyles.left + rect.width > innerWidth) {
    menuStyles.left = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
  }

  return menuStyles;
};
