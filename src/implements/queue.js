class Queue {
	constructor(){
		this.queue = [];
		this.head = 0;
	}

	enqueue(x, y){
		this.queue.push({x, y});
	}

	dequeue(){
		return this.queue[this.head++];
	}

	isEmpty(){
		return this.queue.length - this.head === 0;
	}
}