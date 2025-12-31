import React from 'react';
import classNames from 'classnames';

import styles from './backdrop.module.scss';

export const Backdrop = ({ className, onClick }) => (
  <div className={classNames(styles.backdrop, className)} onClick={onClick} />
);
