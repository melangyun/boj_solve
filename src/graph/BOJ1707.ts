// https://www.acmicpc.net/problem/1707
// 이분 그래프

export {};

class Graph {
  private graph: object;

  constructor(NODE_NUMBER: number) {
    const initObj = {};
    for (let i = 1; i <= NODE_NUMBER; i++) initObj[i] = [];
    this.graph = initObj;
  }

  addNode(start: number, end: number) {
    this.graph[start].push(end);
    this.graph[end].push(start);
  }

  getLinkedNodes(node: number): number[] {
    return this.graph[node];
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
    return this.head === this.queue.length;
  }
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
type TestCase = { NODE_NUM: number; graph: Graph };
const testCases: TestCase[] = [];
init();

console.log(
  testCases.reduce(
    (answer, testCase) => `${answer}${solution(testCase)}\n`,
    "",
  ),
);

function init() {
  for (let i = 1; i < inputStrings.length; ) {
    const [NODE_NUM, EDGE_NUM] = inputStrings[i++].split(" ").map(Number);
    const graph = new Graph(NODE_NUM);

    for (let j = 0; j < EDGE_NUM; j++) {
      const [start, end] = inputStrings[i++].split(" ").map(Number);
      graph.addNode(start, end);
    }
    testCases.push({ NODE_NUM, graph });
  }
}

function solution(testCase: TestCase): string {
  const { NODE_NUM, graph } = testCase;

  const visit: Array<string> = new Array(NODE_NUM + 1);

  for (let i = 1; i <= NODE_NUM; i++) {
    if (visit[i]) continue;

    const queue = new Queue();
    queue.enqueue(i);
    visit[i] = "blue";

    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      if (node === undefined) break;

      const linkedNode = graph.getLinkedNodes(node);
      for (let i = 0; i < linkedNode.length; i++) {
        const next = linkedNode[i];
        if (visit[next]) continue;

        visit[next] = visit[node] === "blue" ? "red" : "blue";

        const nextNodes = graph.getLinkedNodes(next);
        for (let j = 0; j < nextNodes.length; j++) {
          if (visit[nextNodes[j]] === visit[next]) return "NO";
        }

        queue.enqueue(next);
      }
    }
  }

  return "YES";
}
