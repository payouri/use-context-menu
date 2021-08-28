export type GetPositionFunc = (
  rect: DOMRect,
  coords: [number, number]
) => {
  top: number;
  left: number;
};
