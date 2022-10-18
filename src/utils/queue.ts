interface IQueue<T> {
  init: (arr: T[]) => void;
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getElements: () => (T | null)[];
  getSize: () => number;
  getLength: () => number;
  getHead: () => number;
  getTail: () => number;
  clear: () => void;
  isEmpty: () => boolean;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  init = (arr: T[]) => {
    this.container = [...arr];
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) return;

    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) return null;

    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) return null;
    return this.container[this.head % this.size];
  };

  getElements = () => {
    return this.container;
  };

  getSize = () => {
    return this.size;
  };

  getLength = () => {
    return this.length;
  }

  getHead = () => {
    return this.head;
  };

  getTail = () => {
    return this.tail;
  };

  clear = () => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  isEmpty = () => this.length === 0;
}
