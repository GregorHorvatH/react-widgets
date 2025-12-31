import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import { Widget } from './components';

import styles from './react-widgets.module.scss';

/**
 * ReactWidgets component renders a collection of widgets with resize and close functionality.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.defaultWidgets - Initial list of widgets to render.
 * @param {Function} [props.onChange] - Callback triggered when the widgets state changes.
 * @param {React.Ref} ref - Forwarded ref to expose internal methods.
 */
export const ReactWidgets = forwardRef(({ defaultWidgets, fullWidth, fullHeight, onChange }, ref) => {
  const [widgets, setWidgets] = useState(defaultWidgets || []);

  /**
   * Handles resizing of a widget.
   *
   * @param {Object} widget - The widget object with updated size.
   */
  const handleWidgetResize = useCallback((widget) => {
    setWidgets(prev => prev.map(item => item.id === widget.id ? widget : item));
  }, []);

  /**
   * Handles closing (removal) of a widget.
   *
   * @param {string} id - The ID of the widget to remove.
   */
  const handleWidgetClose = useCallback((id) => {
    setWidgets(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleDragStart = useCallback((e, id) => {
    e.dataTransfer.setData('text/plain', id);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e, targetId) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');

    if (draggedId === targetId) return;

    const draggedIndex = widgets.findIndex(widget => widget.id === draggedId);
    const targetIndex = widgets.findIndex(widget => widget.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const updatedWidgets = [...widgets];
    const [draggedWidget] = updatedWidgets.splice(draggedIndex, 1);
    updatedWidgets.splice(targetIndex, 0, draggedWidget);

    setWidgets(updatedWidgets);
    onChange?.(updatedWidgets);
  }, [widgets, onChange]);

  useImperativeHandle(ref, () => ({
    widgets,
    /**
     * Updates the widgets state.
     *
     * @param {Array} newWidgets - The new list of widgets.
     */
    setWidgets,
  }), [widgets, setWidgets]);

  useEffect(() => {
    onChange?.(widgets);
  }, [widgets, onChange]);

  return (
    <div className={styles.widgets}>
      <div className={styles.row}>
        {widgets?.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            fullWidth={fullWidth}
            fullHeight={fullHeight}
            onClose={handleWidgetClose}
            onResize={handleWidgetResize}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
});
