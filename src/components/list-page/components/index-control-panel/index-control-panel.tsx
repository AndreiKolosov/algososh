import React from 'react';
import styles from './index-control-panel.module.css';
import { Button } from '../../../ui/button/button';
import { Input } from '../../../ui/input/input';

export const IndexControlPanel: React.FC<{ extraClass?: string }> = ({ extraClass = '', ...props }) => (
  <div className={`${styles.panel} ${extraClass}`} {...props}>
    <Input extraClass={styles.panel__input} placeholder="Введите индекс" />
    <Button extraClass={styles.panel__btn} text="Добавить по индексу" />
    <Button extraClass={styles.panel__btn} text="Удалить по индексу" />
  </div>
);
