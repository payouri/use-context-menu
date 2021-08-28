import { GetPositionFunc } from '../types';

export const getMenuPosition: GetPositionFunc = (rect, [x, y]) => {
  const menuStyles = {
    top: y,
    left: x,
  };

  const { innerWidth, innerHeight } = window;

  if (y + rect.height > innerHeight) {
    menuStyles.top -= rect.height;
  }

  if (x + rect.width > innerWidth) {
    menuStyles.left -= rect.width;
  }

  if (menuStyles.top < 0) {
    menuStyles.top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
  }

  if (menuStyles.left < 0) {
    menuStyles.left = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
  }

  return menuStyles;
};
