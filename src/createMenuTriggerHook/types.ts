import { EventHandler, SyntheticEvent } from 'react';

export type TriggerBind = {
  onContextMenu: EventHandler<SyntheticEvent>;
  onMouseDown?: EventHandler<SyntheticEvent>;
  onMouseUp?: EventHandler<SyntheticEvent>;
  onMouseOut?: EventHandler<SyntheticEvent>;
  onTouchStart?: EventHandler<SyntheticEvent>;
  onTouchEnd?: EventHandler<SyntheticEvent>;
  onTouchCancel?: EventHandler<SyntheticEvent>;
  onTouchMove?: EventHandler<SyntheticEvent>;
};

export type UseMenuTriggerHook = {
  triggerProps: TriggerBind;
  onTrigger: EventHandler<SyntheticEvent>;
};
