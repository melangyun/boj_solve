export class Queue<T> {
	constructor(private queue: T[] = [], private head = 0) {}

	enqueue(input: T) {
		this.queue.push(input);
	}

	dequeue(): T | null {
		return this.isEmpty() ? null : this.queue[this.head++];
	}

	isEmpty(): boolean {
		return this.queue.length - this.head === 0;
	}
}

const queue = new Queue();
console.log(queue);
