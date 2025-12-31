import { v4 as uuid4 } from 'uuid';

import { MAX_ROW_SIZE } from '../constants';

export const widgetsToRows = ({ widgets, maxRowSize = MAX_ROW_SIZE }) => {
  const finalAcc = widgets.reduce((acc, widget) => {
    const widgetSize = widget.hSize;

    // 1. Check if the widget fits in the current row
    if (acc.current.currentSize + widgetSize <= maxRowSize) {
      // Widget fits: add it and update the size
      acc.current.widgets.push(widget);
      acc.current.currentSize += widgetSize;

      // If the row is now full, complete it
      if (acc.current.currentSize === maxRowSize) {
        acc.completed.push(acc.current);
        // Start a new empty row for the next iteration
        acc.current = { id: uuid4(), widgets: [], currentSize: 0 };
      }
    } else {
      // 2. Widget does not fit: complete the current row
      acc.completed.push(acc.current);

      // Start a new row with the current widget
      acc.current = { id: uuid4(), widgets: [widget], currentSize: widgetSize };

      // Check if this new row is immediately full (only if hSize was 3)
      if (acc.current.currentSize === maxRowSize) {
        acc.completed.push(acc.current);
        // Start a new empty row for the next iteration
        acc.current = { id: uuid4(), widgets: [], currentSize: 0 };
      }
    }
    return acc;
  }, {
    current: { id: uuid4(), widgets: [], currentSize: 0 },
    completed: [],
  });

  return finalAcc.current.widgets.length > 0 ? [...finalAcc.completed, finalAcc.current] : finalAcc.completed;
};
