/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useState, useEffect } from "react";
import styles from './list-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ValueControlPanel } from './components/value-control-panel/value-control-panel';
import { IndexControlPanel } from './components/index-control-panel/index-control-panel';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { LinkedList } from '../../utils/linked-list';
import { delay } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { TInProcess, TListElement } from '../../types/linkedList.types';

export const createInitialElements = (min: number, max: number): TListElement[] => {
  const randomLen = Math.floor(Math.random() * (max - min)) + min;
  const randomNumArray = Array.from({ length: randomLen }, () => Math.floor(Math.random() * 100));
  const randomArray = randomNumArray.map((el: number) => ({
    value: String(el),
    state: ElementStates.Default,
    head: '',
    tail: '',
    extraClass: true,
  }));
  randomArray[randomArray.length - 1].extraClass = false;
  randomArray[randomArray.length - 1].tail = 'tail';
  randomArray[0].head = 'head';
  
  return randomArray;
}

const defaultProcessStat: TInProcess = {
  isAddingToTail: false,
  isAddingToHead: false,
  isAddingByIndex: false,
  isRemovingFormTail: false,
  isRemovingFormHead: false,
  isRemovingByIndex: false,
}

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
          // head={index === 0 ? 'head' : elm.head}
          head={elm.head}
          tail={elm.tail}
          state={elm.state}
          index={index}
          extraClass={elm.extraClass ? styles[`circle_${elm.state}`] : ''}
        />
      </li>
    ));

    setListToRender(elements);
  }

  const modifyElement = (arr: TListElement[], value: string, index: number, position: 'tail' | 'head'): void => {
    const element = arr[index];
    if(position === 'head') element.head = <Circle isSmall letter={value} state={ElementStates.Changing} />;
    if(position === 'tail') element.tail = <Circle isSmall letter={value} state={ElementStates.Changing} />;
  } 
  
  const handleAddToHead = async() => {
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
      state: ElementStates.Default,
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
    setInProcess((state) => ({ ...state, isAddingToHead: false }));
  }

  const handleAddToTail = async () => {
    setInProcess((state) => ({ ...state, isAddingToTail: true }));
    const value = inputValue;
    const listTemp = linkedList;
    const tailIndex = listTemp.getSize() - 1;
    if (listTemp.getValues()[tailIndex]) {
      listTemp.getValues()[tailIndex].tail = <Circle isSmall letter={value} state={ElementStates.Changing} />;
    }
    setLinkedList(listTemp);
    renderList();
    await delay(SHORT_DELAY_IN_MS);
    if (listTemp.getValues()[tailIndex]) {
      listTemp.getValues()[tailIndex].tail = '';
      listTemp.getValues()[tailIndex].extraClass = true;
    }
    renderList();
    listTemp.append({
      value: value,
      state: ElementStates.Default,
      head: '',
      tail: 'tail',
      extraClass: false,
    });
    if(listTemp.getSize() === 1) {
      listTemp.getValues()[tailIndex + 1].head = 'head'
    }
    setInputValue('');
    setLinkedList(listTemp);
    renderList();
    setInProcess((state) => ({ ...state, isAddingToTail: false }));
  };

  const handleRemoveFromHead = async() => {
    setInProcess((state) => ({ ...state, isRemovingFormHead: true }));
    const listTemp = linkedList;
    const prevValue = listTemp.getValues()[0].value;
    listTemp.getValues()[0].head = <Circle isSmall letter={prevValue} state={ElementStates.Changing} />;
    listTemp.getValues()[0].value = '';
    setLinkedList(listTemp);
    renderList();
    await delay(SHORT_DELAY_IN_MS);
    listTemp.deleteHead();
    setLinkedList(listTemp);
    if (listTemp.getValues()[0]) listTemp.getValues()[0].head = 'head';
    renderList();
    setInProcess((state) => ({ ...state, isRemovingFormHead: false }));
  }

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
    await delay(SHORT_DELAY_IN_MS);

    setInProcess((state) => ({ ...state, isAddingByIndex: false }));
  }

  const handleRemoveByIndex = async () => {
    setInProcess((state) => ({ ...state, isRemovingByIndex: true }));
    await delay(SHORT_DELAY_IN_MS);

    setInProcess((state) => ({ ...state, isRemovingByIndex: false }));
  };


  useEffect(() => renderList(), []);

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.controls}>
        <ValueControlPanel
          setValue={setInputValue}
          value={inputValue}
          processState={inProcess}
          isEmpty={!linkedList.getHead()}
          handlers={{ handleAddToHead, handleAddToTail, handleRemoveFromHead, handleRemoveFromTail }}
        />
        <IndexControlPanel
          setValue={setInputIndex}
          value={inputIndex}
          processState={inProcess}
          handlers={{ handleAddByIndex, handleRemoveByIndex }}
        />
      </div>
      <ul className={styles.list}>{listToRender}</ul>
    </SolutionLayout>
  );
};
