export class Queue<T> {
  private _elements: T[];

  constructor() {
    this._elements = [];
  }

  enqueue(obj: T) {
    this._elements.push(obj);
  }

  dequeue() {
    return this._elements.shift();
  }

  isEmpty() {
    return this._elements.length === 0;
  }

  peek() {
    return !this.isEmpty ? this.enqueue[0] : undefined;
  }

  length() {
    return this._elements.length;
  }
}
