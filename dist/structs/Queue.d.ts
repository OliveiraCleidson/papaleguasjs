export declare class Queue<T> {
    private _elements;
    constructor();
    enqueue(obj: T): void;
    dequeue(): T;
    isEmpty(): boolean;
    peek(): any;
    length(): number;
}
