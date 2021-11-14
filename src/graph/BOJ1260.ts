export {};
//www.acmicpc.net/problem/1260
// DFS와 BFS

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, START_NODE] = inputStrings[0].split(" ").map(Number);

class Graph {
  constructor(private graph: object = {}) {}

  addNode(start: number, end: number) {
    this.addSingleNode(start, end);
    this.addSingleNode(end, start);
  }

  private addSingleNode(start: number, end: number) {
    if (this.graph[start]) this.graph[start].push(end);
    else this.graph[start] = [end];
  }

  sort() {
    for (const [key, value] of Object.entries(this.graph)) {
      // 단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문
      this.graph[key] = value.sort((a, b) => a - b);
    }
  }

  getLinkedNodes(node: number): number[] {
    return this.graph[node] || [];
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

  isEmpty(): boolean {
    return this.queue.length === this.head;
  }
}

const graph = new Graph();
const queue = new Queue();
const dfsVisit: Array<boolean> = Array.from(Array(N + 1).fill(false));
let dfsAnswer = "";
let bfsAnswer = "";

init();
dfs(START_NODE);
bfs(START_NODE);
console.log(`${dfsAnswer}\n${bfsAnswer}`);

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    const [startNode, endNode] = inputStrings[i].split(" ").map(Number);
    graph.addNode(startNode, endNode);
  }
  graph.sort();
}

function dfs(node: number) {
  dfsAnswer += `${node} `;
  dfsVisit[node] = true;

  const linkedNodes = graph.getLinkedNodes(node);
  if (linkedNodes === undefined) return;
  for (let i = 0; i < linkedNodes.length; i++) {
    const next = linkedNodes[i];
    if (dfsVisit[next] === false) {
      dfs(next);
    }
  }
}

function bfs(node: number) {
  const visit: Array<boolean> = Array.from(Array(N + 1).fill(false));

  visit[node] = true;
  queue.enqueue(node);

  while (!queue.isEmpty()) {
    const node = queue.dequeue();

    if (node === undefined) break;
    bfsAnswer += `${node} `;

    const linkedNodes = graph.getLinkedNodes(node);
    for (let i = 0; i < linkedNodes.length; i++) {
      const next = graph.getLinkedNodes(node)[i];
      if (visit[next] === false) {
        visit[next] = true;
        queue.enqueue(next);
      }
    }
  }
}
