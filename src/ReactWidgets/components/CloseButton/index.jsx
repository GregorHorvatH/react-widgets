import React from 'react';
import classNames from 'classnames';

import styles from './close-button.module.scss';

export const CloseButton = ({ className, onClick, ...props }) => (
  <button className={classNames(styles.closeButton, className)} onClick={onClick} {...props}>X</button>
);
