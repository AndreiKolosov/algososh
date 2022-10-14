import React, { ChangeEvent, useEffect, useState } from "react";
import styles from './queue-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { createQueue } from '../../utils/utils';
import { initQueue } from '../../services/slices/queueSlice';
import { DEQUEUE, ENQUEUE } from '../../services/sagas/actions/queueActions';

export const QueuePage: React.FC = () => {
const [value, setValue] = useState<string>('');
const queueSize = 6;
const maxInputValueLength = 4;
const { queue, queueHead, queueTail, queueLength, inProcess } = useAppSelector((store) => store.queue);
const dispatch = useAppDispatch();

const queueItem = {
 value,
 index: queueTail,
 head: queueHead === queueTail  || false,
 tail: true,
 state: ElementStates.Changing,
};

const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  setValue(e.target?.value);
};

const handleAdd = () => {
  dispatch({ type: ENQUEUE, item: queueItem })
  setValue('');
};

const handleRemove = () => {
  dispatch({ type: DEQUEUE })
  setValue('');
};

const handleClear = () => {
  dispatch(initQueue({ queue: createQueue(queueSize), size: queueSize }));
  setValue('');
};

useEffect(() => {
  dispatch(initQueue({queue: createQueue(queueSize), size: queueSize}))
}, [dispatch])

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.controls}>
        <Input
          isLimitText
          maxLength={maxInputValueLength}
          value={value}
          onChange={handleInputChange}
          placeholder="Введите текст"
          // disabled={stack.length >= 6}
        />
        <Button
          type="button"
          text="Добавить"
          onClick={handleAdd}
          disabled={inProcess || queueLength === queueSize}
        />
        <Button
          type="button"
          text="Удалить"
          onClick={handleRemove}
          // disabled={inProcess}
          // extraClass={styles.controls__removeBtn}
        />
        <Button
          type="button"
          text="Очистить"
          onClick={handleClear}
          // disabled={inProcess}
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
