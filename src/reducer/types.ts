import { CSSProperties } from 'react';

export type ReducerState = {
  style: CSSProperties;
  isVisible: boolean;
  selectedIndex: number;
  coordinates: [number, number];
  collectedData: unknown;
};
