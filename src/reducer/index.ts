import { Reducer } from 'react';
import { Actions } from './actions';
import { ReducerState } from './types';

export * from './types';
export * from './initialState';

export const contextMenuReducer: Reducer<ReducerState, Actions> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'setIsVisible':
      return {
        ...state,
        isVisible: action.payload,
      };
    case 'updateStyle':
      return {
        ...state,
        style: {
          ...state.style,
          ...action.payload,
        },
      };
    case 'setStyle':
      return {
        ...state,
        style: action.payload,
      };
    case 'setCollectedData':
      return {
        ...state,
        collectedData: action.payload,
      };
    case 'setCoordinates':
      return {
        ...state,
        coordinates: action.payload,
      };
    case 'setSelectedIndex':
      return {
        ...state,
        selectedIndex:
          typeof action.payload === 'function'
            ? action.payload(state.selectedIndex)
            : action.payload,
      };
    case 'updateState':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
