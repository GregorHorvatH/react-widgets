import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import { MAX_ROW_SIZE, MIN_ROW_HEIGHT } from '../../constants';
import { Backdrop } from '../Backdrop';
import { CloseButton } from '../CloseButton';
import { ConfigButton } from '../ConfigButton';
import { ResizeButton } from '../ResizeButton';
import { Resizer } from '../Resizer';

import styles from './widget.module.scss';

export const Widget = ({
  fullWidth,
  fullHeight,
  widget,
  styles: customStyles,
  onClose,
  onResize,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showResizer, setShowResizer] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const { id, component: Component, title, hSize, vSize } = widget || {};
  const showBackdrop = showOptions || showResizer;
  const widgetWidth = `${(100 / MAX_ROW_SIZE) * hSize}%`;
  const widgetHeight = `${MIN_ROW_HEIGHT * vSize}px`;

  const toggleShowOptions = useCallback(
    () => setShowOptions(prev => !prev),
    [setShowOptions]
  );

  const toggleShowResizer = useCallback(
    () => setShowResizer(prev => !prev),
    [setShowResizer]
  );

  const handleBackdropClick = useCallback(() => {
    setShowOptions(false);
    setShowResizer(false);
  }, [setShowOptions, setShowResizer]);

  const handleOptionClick = useCallback((value) => {
    console.log('value:', value);
    setShowOptions(false);
  }, [setShowOptions]);

  const handleCloseWidget = useCallback(
    () => onClose?.(id),
    [onClose, id]
  );

  const handleWidgetResize = useCallback(
    (updatedWidget) => {
      onResize?.(updatedWidget);
      toggleShowResizer();
    },
    [onResize, toggleShowResizer]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
    onDragOver?.(e);
  }, [onDragOver]);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    setIsDragOver(false);
    onDrop?.(e, id);
  }, [onDrop, id]);

  return (
    <div
      className={classNames(styles.widgetWrapper, { [styles['drag-over']]: isDragOver })}
      style={{
        flex: fullWidth ? `${hSize} 0 ${widgetWidth}` : undefined,
        width: fullWidth ? undefined : widgetWidth,
        minHeight: fullHeight ? widgetHeight : undefined,
        height: fullHeight ? undefined : widgetHeight,
      }}
      onDragStart={(e) => onDragStart(e, id)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={classNames(styles.widget, customStyles?.widget)}>
        {showBackdrop && <Backdrop onClick={handleBackdropClick} />}
        <div className={classNames(styles.header, customStyles?.header)}>
          <div className={classNames(styles.title, customStyles?.title)} draggable>
            <span>{title}</span>
          </div>
          <div className={classNames(styles.toolbar, customStyles?.toolbar)}>
            <ConfigButton
              showOptions={showOptions}
              onClick={toggleShowOptions}
              onOptionClick={handleOptionClick}
            />
            <ResizeButton onClick={toggleShowResizer} />
            <CloseButton onClick={handleCloseWidget} />
            {showResizer && (
              <Resizer widget={widget} onResize={handleWidgetResize} />
            )}
          </div>
        </div>
        <div className={classNames(styles.content, customStyles?.content)}>
          <Component widget={widget} />
        </div>
      </div>
    </div>
  );
};
