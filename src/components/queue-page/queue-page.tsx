/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from './queue-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { Queue } from './queue';
import { delay } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { TProcess, TQueueElement } from '../../types/queue.types';

export const QueuePage: React.FC = () => {
  const queueSize = 6;
  const queueInstance = new Queue<TQueueElement>(queueSize);
  const [queueToRender, setQueueToRender] = useState<JSX.Element[]>([]);
  const [value, setValue] = useState<string>('');
  const [queue, setQueue] = useState<Queue<TQueueElement>>(queueInstance);
  const [inProcess, setInProcess] = useState<TProcess>({ isAdding: false, isRemoving: false });
  const maxInputValueLength = 4;

  const renderQueue = () => {
    const arr = [];
    const queueTemp = queue.getElements();

    for (let i = 0; i < queueSize; i++) {
      if (queueTemp[i]) {
        arr.push(queueTemp[i]);
      } else {
        arr.push({ value: '', state: ElementStates.Default });
      }
    }
    const elements = arr.map((elm, index) => (
      <li key={index}>
        <Circle
          state={elm ? elm.state : ElementStates.Default}
          letter={elm ? elm.value : ''}
          index={index}
          tail={queue.getTail() === index + 1 && !queue.isEmpty() ? 'tail' : ''}
          head={queue.getHead() === index && queueTemp[queue.getHead()] ? 'head' : ''}
        />
      </li>
    ));
    setQueueToRender(elements);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target?.value);
  };

  const handleAdd = async () => {
    setInProcess((state) => ({ ...state, isAdding: true }));
    const inputValue = value;
    const queueTemp = queue;
    queue.enqueue({ value: inputValue, state: ElementStates.Changing });
    setValue('');
    setQueue(queueTemp);
    renderQueue();
    await delay(SHORT_DELAY_IN_MS);
    const queueElements = queueTemp.getElements();
    const queueTailElm = queueElements[queueTemp.getTail() - 1];
    if (queueTailElm) queueTailElm.state = ElementStates.Default;
    setQueue(queueTemp);
    renderQueue();
    setInProcess((state) => ({ ...state, isAdding: false }));
  };

  const handleRemove = async () => {
    setInProcess((state) => ({ ...state, isRemoving: true }));
    const queueTemp = queue;
    const headElement = queueTemp.peak();
    if (headElement) headElement.state = ElementStates.Changing;
    setQueue(queueTemp);
    renderQueue();
    await delay(SHORT_DELAY_IN_MS);
    queueTemp.dequeue();
    setQueue(queueTemp);
    renderQueue();
    setInProcess((state) => ({ ...state, isRemoving: false }));
  };

  const handleClear = () => {
    setInProcess((state) => ({ ...state, isRemoving: true }));
    const queueTemp = queue;
    queueTemp.clear();
    setQueue(queueTemp);
    renderQueue();
    setInProcess((state) => ({ ...state, isRemoving: false }));
  };

  useEffect(() => {
    renderQueue();
  }, []);

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.controls}>
        <Input
          isLimitText
          maxLength={maxInputValueLength}
          value={value}
          onChange={handleInputChange}
          placeholder="Введите текст"
          disabled={queue.getLength() === queueSize}
        />
        <Button
          type="button"
          text="Добавить"
          onClick={handleAdd}
          isLoader={inProcess.isAdding}
          disabled={inProcess.isRemoving || !value || queue.getLength() === queueSize}
        />
        <Button
          type="button"
          text="Удалить"
          onClick={handleRemove}
          isLoader={inProcess.isRemoving}
          disabled={inProcess.isAdding || queue.isEmpty()}
        />
        <Button
          type="button"
          text="Очистить"
          onClick={handleClear}
          disabled={inProcess.isAdding || inProcess.isRemoving || queue.isEmpty()}
        />
      </div>

      <ul className={styles.list}>{queueToRender}</ul>
    </SolutionLayout>
  );
};
