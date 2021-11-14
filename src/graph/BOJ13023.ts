export {};
// https://www.acmicpc.net/problem/13023
// ABCDE

class Graph {
  private data: Map<number, number[]>;
  private visit: boolean[];
  private peopleNumber: number;
  answer: number;

  constructor(peopleNumber: number) {
    this.peopleNumber = peopleNumber;
    this.data = new Map();
    this.visit = new Array(peopleNumber);
    this.answer = 0;
  }

  addNode(start: number, end: number) {
    this.addSingleNode(start, end);
    this.addSingleNode(end, start);
  }

  findCycle() {
    for (let [node, linkedNodes] of this.data) {
      if (!this.visit[node] && this.answer === 0) {
        this.dfs(node, 1);
      }
      if (this.answer) {
        break;
      }
    }

    return this.answer;
  }

  dfs(node: number, cycle: number) {
    if (cycle === 6) {
      this.answer = 1;
      return;
    }
    this.visit[node] = true;

    const linkedPeople = this.getLinkedNodes(node);
    for (let i = 0; i < linkedPeople.length; i++) {
      const next = linkedPeople[i];
      if (this.visit[next]) continue;

      this.dfs(next, cycle + 1);
      if (this.answer) return;
    }
    this.visit[node] = false;
  }

  private addSingleNode(start: number, end: number) {
    this.data.has(start)
      ? this.data.get(start)!.push(end)
      : this.data.set(start, [end]);
  }

  private getLinkedNodes(node: number) {
    return this.data.get(node) || [];
  }
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [NODE_NUM, EDGE_NUM] = inputStrings[0].split(" ").map(Number);
const graph = new Graph(NODE_NUM);
init();
console.log(graph.findCycle());

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    const [node1, node2] = inputStrings[i].split(" ").map(Number);
    graph.addNode(node1, node2);
  }
}
