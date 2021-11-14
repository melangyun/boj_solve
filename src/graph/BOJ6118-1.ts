// https://www.acmicpc.net/problem/6118
// 숨바꼭질

export {};

class Graph {
  constructor(private graph: Map<number, number[]> = new Map()) {}

  addNode(start: number, end: number) {
    this.addSingleNode(start, end);
    this.addSingleNode(end, start);
  }

  private addSingleNode(start: number, end: number) {
    if (this.graph.has(start)) this.graph.get(start)!.push(end);
    else this.graph.set(start, [end]);
  }

  getLinkedNodes(node: number): number[] {
    return this.graph.get(node) || [];
  }
}

class Queue {
  constructor(private queue: number[] = [], private head = 0) {}

  enqueue(value: number) {
    this.queue.push(value);
  }

  dequeue(): number | undefined {
    return this.isEmpty() ? undefined : this.queue[this.head++];
  }

  isEmpty() {
    return this.head === this.queue.length;
  }
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const BARN_NUM = Number(inputStrings[0].split(" ")[0]);

const START_BARN = 1;
const graph = new Graph();
const queue = new Queue();

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
  let maxDistinctBarns: number[] = [];
  let maxDistinct = 0;

  queue.enqueue(START_BARN);
  visit[START_BARN] = 0;

  while (!queue.isEmpty()) {
    const barn = queue.dequeue();
    if (barn === undefined) break;

    const linkedNode = graph.getLinkedNodes(barn);
    for (let i = 0; i < linkedNode.length; i++) {
      const next = linkedNode[i];
      if (visit[next] || visit[next] === 0) continue;

      visit[next] = visit[barn] + 1;
      queue.enqueue(next);

      if (maxDistinct < visit[next]) {
        maxDistinct = visit[next];
        maxDistinctBarns = [next];
      } else if (maxDistinct === visit[next]) {
        maxDistinctBarns.push(next);
      }
    }
  }

  console.log(
    `${Math.min(...maxDistinctBarns)} ${maxDistinct} ${
      maxDistinctBarns.length
    }`,
  );
}
