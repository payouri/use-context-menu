import { ReducerState } from './types';

export const initialState: ReducerState = {
  style: {},
  isVisible: false,
  selectedIndex: -1,
  coordinates: [0, 0],
  collectedData: undefined,
};
