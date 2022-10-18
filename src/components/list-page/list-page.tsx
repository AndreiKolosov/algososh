import React, { ReactElement, useState, useEffect } from "react";
import styles from './list-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ValueControlPanel } from './components/value-control-panel/value-control-panel';
import { IndexControlPanel } from './components/index-control-panel/index-control-panel';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { LinkedList } from '../../utils/linked-list';

export type TListElement = {
  value: string;
  state: ElementStates;
  head: string | ReactElement;
  tail: string | ReactElement;
  extraClass: boolean;
};

export type TInProcess = {
  isAddingToTail: boolean;
  isAddingToHead: boolean;
  isAddingByIndex: boolean;
  isRemovingFormTail: boolean;
  isRemovingFormHead: boolean;
  isRemovingByIndex: boolean;
};

export const createArray = (min: number, max: number) => {
  const randomLen = Math.floor(Math.random() * (max - min)) + min;
  const randomNumArray = Array.from({ length: randomLen }, () => Math.floor(Math.random() * 100));
  const randomArray = randomNumArray.map((el: number) => ({
    value: el,
    state: ElementStates.Default,
    head: '',
    tail: '',
    extraClass: true,
  }));
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
  const listInstance = new LinkedList<TListElement>();
  const [linkedList, setLinkedList] = useState<LinkedList<TListElement>>(listInstance);
  const [listToRender, setListToRender] = useState<JSX.Element[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const [inProcess, setInProcess] = useState<TInProcess>(defaultProcessStat);
  
  const renderList = () => {
    const randomArr = createArray(3, 7);
    randomArr[randomArr.length - 1].extraClass = false;
    const elements = randomArr.map((elm, index) => (
      <li key={index}>
        <Circle
          letter={String(elm.value)}
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
  
  useEffect(() => renderList() ,[])
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.controls}>
        <ValueControlPanel setValue={setInputValue} value={inputValue} />
        <IndexControlPanel setValue={setInputIndex} value={inputIndex} />
      </div>
      <ul className={styles.list}>
        {listToRender}
      </ul>
    </SolutionLayout>
  );
};
