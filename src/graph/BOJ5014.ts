export {};
// https://www.acmicpc.net/problem/5014
// 스타트링크
class Queue<T> {
  constructor(private queue: T[] = [], private head: number = 0) {}

  enqueue(value: T) {
    this.queue.push(value);
  }

  dequeue(): T | undefined {
    return this.isEmpty() ? undefined : this.queue[this.head++];
  }

  isEmpty(): boolean {
    return this.queue.length === this.head;
  }
}

const [F, S, G, U, D] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

solution();

function solution() {
  const visit = Array.from(Array(F + 1)).fill(-1);
  const queue = new Queue<number>();

  queue.enqueue(S);
  visit[S] = 0;

  while (!queue.isEmpty()) {
    const floor = queue.dequeue();

    if (!floor) break;

    if (floor === G) {
      return console.log(visit[floor]);
    }

    const upFloor = floor + U;
    const downFloor = floor - D;

    if (upFloor <= F && visit[upFloor] === -1) {
      queue.enqueue(upFloor);
      visit[upFloor] = visit[floor] + 1;
    }

    if (downFloor > 0 && visit[downFloor] === -1) {
      queue.enqueue(downFloor);
      visit[downFloor] = visit[floor] + 1;
    }
  }
  console.log("use the stairs");
}
