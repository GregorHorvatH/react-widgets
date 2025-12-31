import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import { BOXES } from '../../constants';

import styles from './resizer.module.scss';

export const Resizer = ({ widget, onResize }) => {
  const [hover, setHover] = useState();
  const { hSize, vSize } = widget || {};

  const handleMouseLeave = useCallback(
    () => setHover(undefined),
    [setHover]
  );

  const handleBoxClick = useCallback(
    ({ x, y }) => onResize?.({ ...widget, hSize: x + 1, vSize: y + 1 }),
    [onResize, widget]
  );

  const renderBox = useCallback(
    ({ x, y }) => {
      const isHovering = hover?.x >= x && hover?.y >= y;
      const isActive = hSize >= x + 1 && vSize >= y + 1;
      const isHoverInActive = isHovering && isActive && hover?.x < hSize && hover?.y < vSize;

      return (
        <div
          className={classNames({
            [styles.hover]: isHovering,
            [styles.active]: isActive,
            [styles.hoverInActive]: isHoverInActive,
            [styles.box]: true,
          })}
          key={`${widget.id}-${x}-${y}`}
          onClick={() => handleBoxClick({ x, y })}
          onMouseEnter={() => setHover({ x, y })}
          onMouseLeave={handleMouseLeave}
        />
      );
    },
    [hover, hSize, vSize, handleBoxClick, handleMouseLeave]
  );

  return (
    <div className={styles.resizer} onMouseLeave={handleMouseLeave}>
      {BOXES?.map(({ id, items }) => (
        <div className={styles.boxes} key={id}>
          {items.map(renderBox)}
        </div>
      ))}
    </div>
  );
};
