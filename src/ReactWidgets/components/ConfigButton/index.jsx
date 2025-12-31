import React, { useCallback } from 'react';

import GearIcon from './gear-icon.svg?react';

import styles from './config-button.module.scss';

export const ConfigButton = ({ showOptions, onClick, onOptionClick }) => {
  const handleOptionClick = useCallback((e) => {
    e.stopPropagation();
    onOptionClick(e.target.dataset.value);
  }, [onOptionClick]);

  return (
    <button className={styles.configButton} onClick={onClick} >
      <GearIcon />
      {
        showOptions && (
          <div className={styles.options}>
            <span className={styles.option} data-value="option-1" onClick={handleOptionClick}>option 1</span>
            <span className={styles.option} data-value="option-2" onClick={handleOptionClick}>option 2</span>
            <span className={styles.option} data-value="option-3" onClick={handleOptionClick}>option 3</span>
          </div>
        )
      }
    </button >
  );
};
