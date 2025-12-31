import React from 'react';
import classNames from 'classnames';

import styles from './resize-button.module.scss';

export const ResizeButton = ({ className, ...props }) => (
  <button
    className={classNames(styles.resizeButton, className)}
    {...props}
  >
    <div className={styles.row}>
      <div className={styles.box} />
      <div className={styles.box} />
      <div className={styles.box} />
    </div>
    <div className={styles.row}>
      <div className={styles.box} />
      <div className={styles.box} />
      <div className={styles.box} />
    </div>
    <div className={styles.row}>
      <div className={styles.box} />
      <div className={styles.box} />
      <div className={styles.box} />
    </div>
  </button>
);
