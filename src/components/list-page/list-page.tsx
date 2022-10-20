/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from './list-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ValueControlPanel } from './components/value-control-panel/value-control-panel';
import { IndexControlPanel } from './components/index-control-panel/index-control-panel';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { LinkedList } from './linked-list';
import { delay } from '../../utils/utils';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../constants/delays';
import { TInProcess, TListElement } from '../../types/linkedList.types';
import { createInitialElements, defaultProcessStat, setDefaultElementStates } from './helpers';

export const ListPage: React.FC = () => {
  const listInstance = new LinkedList<TListElement>(createInitialElements(3, 5));
  const [linkedList, setLinkedList] = useState<LinkedList<TListElement>>(listInstance);
  const [listToRender, setListToRender] = useState<JSX.Element[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const [inProcess, setInProcess] = useState<TInProcess>(defaultProcessStat);

  const renderList = (): void => {
    const listTemp = linkedList.getValues();

    const elements = listTemp.map((elm, index) => (
      <li key={index}>
        <Circle
          letter={elm.value}
          head={elm.head}
          tail={elm.tail}
          state={elm.state}
          index={index}
          extraClass={elm.extraClass ? styles[`circle_${elm.state}`] : ''}
        />
      </li>
    ));

    setListToRender(elements);
  };

  const handleAddToHead = async () => {
    setInProcess((state) => ({ ...state, isAddingToHead: true }));
    const value = inputValue;
    const listTemp = linkedList;
    if (listTemp.getValues()[0]) {
      listTemp.getValues()[0].head = <Circle isSmall letter={value} state={ElementStates.Changing} />;
    }
    setLinkedList(listTemp);
    renderList();
    await delay(SHORT_DELAY_IN_MS);
    if (listTemp.getValues()[0]) listTemp.getValues()[0].head = '';
    renderList();
    listTemp.prepend({
      value: value,
      state: ElementStates.Modified,
      head: 'head',
      tail: '',
      extraClass: true,
    });
    if (listTemp.getSize() === 1) {
      listTemp.getValues()[0].tail = 'tail';
      listTemp.getValues()[0].extraClass = false;
    }
    setInputValue('');
    setLinkedList(listTemp);
    renderList();
    listTemp.getValues()[0].state = ElementStates.Default;
    setLinkedList(listTemp);
    await delay(SHORT_DELAY_IN_MS);
    renderList();
    setInProcess((state) => ({ ...state, isAddingToHead: false }));
  };

  const handleAddToTail = async () => {
    setInProcess((state) => ({ ...state, isAddingToTail: true }));
    const value = inputValue;
    const listTemp = linkedList;
    const tailIndex = listTemp.getSize() - 1;
    if (listTemp.getValues()[tailIndex]) {
      listTemp.getValues()[tailIndex].head = <Circle isSmall letter={value} state={ElementStates.Changing} />;
    }
    setLinkedList(listTemp);
    renderList();
    await delay(SHORT_DELAY_IN_MS);
    if (listTemp.getValues()[tailIndex]) {
      listTemp.getValues()[tailIndex].head = '';
      listTemp.getValues()[tailIndex].tail = '';
      listTemp.getValues()[tailIndex].extraClass = true;
    }
    renderList();
    listTemp.append({
      value: value,
      state: ElementStates.Modified,
      head: '',
      tail: 'tail',
      extraClass: false,
    });
    if (listTemp.getSize() === 1) {
      listTemp.getValues()[tailIndex + 1].head = 'head';
    }
    setInputValue('');
    setLinkedList(listTemp);
    renderList();
    listTemp.getValues()[tailIndex + 1].state = ElementStates.Default;
    setLinkedList(listTemp);
    await delay(SHORT_DELAY_IN_MS);
    renderList();
    setInProcess((state) => ({ ...state, isAddingToTail: false }));
  };

  const handleRemoveFromHead = async () => {
    setInProcess((state) => ({ ...state, isRemovingFormHead: true }));
    const listTemp = linkedList;
    const prevValue = listTemp.getValues()[0].value;
    listTemp.getValues()[0].tail = <Circle isSmall letter={prevValue} state={ElementStates.Changing} />;
    listTemp.getValues()[0].value = '';
    setLinkedList(listTemp);
    renderList();
    await delay(SHORT_DELAY_IN_MS);
    listTemp.deleteHead();
    setLinkedList(listTemp);
    if (listTemp.getValues()[0]) listTemp.getValues()[0].head = 'head';
    renderList();
    setInProcess((state) => ({ ...state, isRemovingFormHead: false }));
  };

  const handleRemoveFromTail = async () => {
    setInProcess((state) => ({ ...state, isRemovingFormTail: true }));
    const listTemp = linkedList;
    const tailIndex = listTemp.getSize() - 1;
    const prevValue = listTemp.getValues()[tailIndex].value;
    listTemp.getValues()[tailIndex].tail = <Circle isSmall letter={prevValue} state={ElementStates.Changing} />;
    listTemp.getValues()[tailIndex].value = '';
    setLinkedList(listTemp);
    renderList();
    await delay(SHORT_DELAY_IN_MS);
    listTemp.deleteTail();
    setLinkedList(listTemp);
    if (listTemp.getValues()[tailIndex - 1]) {
      listTemp.getValues()[tailIndex - 1].tail = 'tail';
      listTemp.getValues()[tailIndex - 1].extraClass = false;
    }
    renderList();
    setInProcess((state) => ({ ...state, isRemovingFormTail: false }));
  };

  const handleAddByIndex = async () => {
    setInProcess((state) => ({ ...state, isAddingByIndex: true }));
    const index = Number(inputIndex);
    const value = inputValue;
    const listTemp = linkedList;
    let currIndex = 0;
    if (index > listTemp.getSize() - 1) {
      setInputIndex('Неверный индекс!');
      await delay(DELAY_IN_MS);
      setInputIndex('');
    } else if (index === 0) {
      await handleAddToHead();
    } else {
      while (currIndex < index) {
        if (listTemp.getValues()[currIndex - 1]) {
          listTemp.getValues()[currIndex - 1].head = '';
          if (currIndex - 1 === 0) listTemp.getValues()[currIndex - 1].head = 'head';
        }
        listTemp.getValues()[currIndex].head = <Circle isSmall letter={value} state={ElementStates.Changing} />;
        listTemp.getValues()[currIndex].state = ElementStates.Changing;
        setLinkedList(listTemp);
        await delay(SHORT_DELAY_IN_MS);
        renderList();
        currIndex++;
      }
      setDefaultElementStates(listTemp.getValues());
      linkedList.addByIndex(
        {
          value: value,
          state: ElementStates.Modified,
          head: '',
          tail: '',
          extraClass: true,
        },
        index,
      );
      setInputIndex('');
      setInputValue('');
      listTemp.getValues()[index - 1].head = '';
      setLinkedList(listTemp);
      await delay(SHORT_DELAY_IN_MS);
      renderList();
      listTemp.getValues()[index].state = ElementStates.Default;
      setLinkedList(listTemp);
      await delay(DELAY_IN_MS);
      renderList();
    }
    setInProcess((state) => ({ ...state, isAddingByIndex: false }));
  };

  const handleRemoveByIndex = async () => {
    setInProcess((state) => ({ ...state, isRemovingByIndex: true }));
    const index = Number(inputIndex);
    const listTemp = linkedList;
    const lastIndex = listTemp.getSize() - 1;
    let currIndex = 0;
    if (index > lastIndex) {
      setInputIndex('Неверный индекс!');
      await delay(DELAY_IN_MS);
      setInputIndex('');
    } else if (index === 0) {
      await handleRemoveFromHead();
      setInputIndex('');
    } else if (index === lastIndex) {
      await handleRemoveFromTail();
      setInputIndex('');
    } else {
      while (currIndex < index) {
        const element = listTemp.getValues()[currIndex];
        const prevElement = listTemp.getValues()[currIndex - 1];
        if (prevElement) listTemp.getValues()[currIndex - 1].tail = '';
        element.state = ElementStates.Changing;
        setLinkedList(listTemp);
        await delay(SHORT_DELAY_IN_MS);
        renderList();
        currIndex++;
      }
      const currElement = listTemp.getValues()[index];
      currElement.tail = <Circle isSmall letter={currElement.value} state={ElementStates.Changing} />;
      currElement.value = '';
      listTemp.getValues()[index - 1].tail = '';
      setLinkedList(listTemp);
      await delay(SHORT_DELAY_IN_MS);
      renderList();
      setDefaultElementStates(listTemp.getValues());
      listTemp.deleteByIndex(index);
      setInputIndex('');
      setInputValue('');
      setLinkedList(listTemp);
      await delay(DELAY_IN_MS);
      renderList();
    }
    setInProcess((state) => ({ ...state, isRemovingByIndex: false }));
  };

  useEffect(() => renderList(), []);

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.controls}>
        <ValueControlPanel
          setValue={setInputValue}
          value={inputValue}
          disabledAdd={linkedList.getSize() === 10}
          processState={inProcess}
          isEmpty={!linkedList.getHead()}
          handlers={{ handleAddToHead, handleAddToTail, handleRemoveFromHead, handleRemoveFromTail }}
        />
        <IndexControlPanel
          setValue={setInputIndex}
          index={inputIndex}
          isAddDisabled={!inputValue}
          processState={inProcess}
          handlers={{ handleAddByIndex, handleRemoveByIndex }}
        />
      </div>
      <ul className={styles.list}>{listToRender}</ul>
    </SolutionLayout>
  );
};
