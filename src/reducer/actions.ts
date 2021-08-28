import { CSSProperties } from 'react';
import { ReducerState } from './types';

export type SetIsVisible = {
  type: 'setIsVisible';
  payload: boolean;
};
export type SetStyle = {
  type: 'setStyle';
  payload: CSSProperties;
};
export type UpdateStyle = {
  type: 'updateStyle';
  payload: CSSProperties;
};
export type SetSelectedIndex = {
  type: 'setSelectedIndex';
  payload: number | ((s: number) => number);
};
export type SetCoordinates = {
  type: 'setCoordinates';
  payload: [number, number];
};
export type SetCollectedData = {
  type: 'setCollectedData';
  payload: unknown;
};
export type UpdateState = {
  type: 'updateState';
  payload: Partial<ReducerState>;
};

export type Actions =
  | SetIsVisible
  | SetStyle
  | UpdateStyle
  | SetSelectedIndex
  | SetCoordinates
  | SetCollectedData
  | UpdateState;
