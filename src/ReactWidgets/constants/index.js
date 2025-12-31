import { v4 as uuid4 } from 'uuid';

export const MAX_COL_SIZE = 6;
export const MAX_ROW_SIZE = 6;
export const MIN_ROW_HEIGHT = 150;

const getResizerBoxes = () => {
  const initialMatrix = [];
  for (let y = 0; y < MAX_COL_SIZE; y += 1) {
    const col = { id: uuid4(), items: [] };
    for (let x = 0; x < MAX_ROW_SIZE; x += 1) {
      col.items.push({ x, y });
    }
    initialMatrix.push(col);
  }
  return initialMatrix;
};

export const BOXES = getResizerBoxes();
