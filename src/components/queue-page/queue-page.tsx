import React, { ChangeEvent, useEffect, useState } from "react";
import styles from './queue-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { createQueue } from '../../utils/utils';
import { clearQueue, initQueue } from '../../services/slices/queueSlice';
import { DEQUEUE, ENQUEUE } from '../../services/sagas/actions/queueActions';

export const QueuePage: React.FC = () => {
const [value, setValue] = useState<string>('');
const queueSize = 6;
const maxInputValueLength = 4;
const { queue, queueLength, inProcess } = useAppSelector((store) => store.queue);
const dispatch = useAppDispatch();

const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  setValue(e.target?.value);
};

const handleAdd = () => {
  dispatch({ type: ENQUEUE, value })
  setValue('');
};

const handleRemove = () => {
  dispatch({ type: DEQUEUE })
  setValue('');
};

const handleClear = () => {
  dispatch(clearQueue());
  setValue('');
};

useEffect(() => {
  dispatch(initQueue({queue: createQueue(queueSize), size: queueSize}));
}, [dispatch, queue.length])

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.controls}>
        <Input
          isLimitText
          maxLength={maxInputValueLength}
          value={value}
          onChange={handleInputChange}
          placeholder="Введите текст"
          disabled={queueLength === queueSize}
        />
        <Button
          type="button"
          text="Добавить"
          onClick={handleAdd}
          disabled={!value || inProcess || queueLength === queueSize}
        />
        <Button
          type="button"
          text="Удалить"
          onClick={handleRemove}
          disabled={inProcess || queueLength === 0}
        />
        <Button
          type="button"
          text="Очистить"
          onClick={handleClear}
          disabled={inProcess || queueLength === 0}
        />
      </div>

      <ul className={styles.list}>
        {queue.map((item, index) => (
          <li key={index}>
            <Circle
              state={item ? item.state : ElementStates.Default}
              letter={item ? item.value : ''}
              index={index}
              tail={item.tail ? 'tail' : ''}
              head={item.head ? 'head' : ''}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
