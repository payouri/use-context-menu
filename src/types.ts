export interface ContextTriggerConfig {
  collect: () => unknown;
  disable: boolean;
  disableIfShiftIsPressed: boolean;
  holdToDisplay: {
    mouse: false | number;
    touch: false | number;
  };
  posX: number;
  posY: number;
}

export type Coordinates = [number, number];

export interface MenuStyles {
  top: number;
  left: number;
}
