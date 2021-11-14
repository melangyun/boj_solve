export {};

class Graph extends Map<number, number[]> {
  constructor() {
    super();
  }

  addNode(start: number, end: number) {
    this.setNode(start, end);
    this.setNode(end, start);
  }

  setNode(start: number, end: number) {
    if (this.has(start)) {
      this.get(start)!.push(end);
    } else {
      this.set(start, [end]);
    }
  }
}

class Queue<T> {
  constructor(private queue: T[] = [], private head: number = 0) {}

  enqueue(value: T) {
    this.queue.push(value);
  }

  dequeue(): undefined | T {
    return this.isEmpty() ? undefined : this.queue[this.head++];
  }

  isEmpty(): boolean {
    return this.queue.length === this.head;
  }
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const BARN_NUM = Number(inputStrings[0].split(" ")[0]);
const graph = new Graph();
const queue = new Queue<number>();

init();
solution();

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    const [start, end] = inputStrings[i].split(" ").map(Number);
    graph.addNode(start, end);
  }
}

function solution() {
  const visit = new Array<number>(BARN_NUM + 1);
  let maxDistinctBarn: number[] = [];
  let maxDistinct = 0;

  queue.enqueue(1);
  visit[1] = 0;

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (node === undefined) break;

    const linkedNodes = graph.get(node) || [];
    for (let i = 0; i < linkedNodes.length; i++) {
      const next = linkedNodes[i];
      if (visit[next] || visit[next] === 0) continue;

      queue.enqueue(next);
      visit[next] = visit[node] + 1;
      if (maxDistinct < visit[next]) {
        maxDistinctBarn = [next];
        maxDistinct = visit[next];
      } else if (maxDistinct === visit[next]) {
        maxDistinctBarn.push(next);
      }
    }
  }

  console.log(
    `${Math.min(...maxDistinctBarn)} ${maxDistinct} ${maxDistinctBarn.length}`,
  );
}
