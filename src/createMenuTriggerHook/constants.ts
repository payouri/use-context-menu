import { ContextTriggerConfig } from '../types';

export const defaultConfig: ContextTriggerConfig = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  collect: () => {},
  disable: false,
  disableIfShiftIsPressed: false,
  holdToDisplay: {
    mouse: false,
    touch: false,
  },
  posX: 0,
  posY: 0,
};
