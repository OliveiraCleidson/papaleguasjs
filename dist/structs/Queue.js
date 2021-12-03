"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue {
    constructor() {
        this._elements = [];
    }
    enqueue(obj) {
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
exports.Queue = Queue;
//# sourceMappingURL=Queue.js.map