export {};
// https://www.acmicpc.net/problem/2644
// 촌수계산

class Graph {
  private data: Map<number, number[]>;
  private visit: boolean[];
  answer: number;

  constructor(peopleNum: number) {
    this.data = new Map();
    this.visit = new Array(peopleNum + 1);
    this.answer = -1;
  }

  addNode(parent: number, boy: number) {
    this.addSingleNode(parent, boy);
    this.addSingleNode(boy, parent);
  }

  private addSingleNode(start: number, end: number) {
    if (this.data.has(start)) {
      this.data.get(start)!.push(end);
    } else {
      this.data.set(start, [end]);
    }
  }

  getLinkedNodes(parent: number) {
    return this.data.get(parent) || [];
  }

  dfs(node: number, chon: number) {
    if (this.answer !== -1) return;
    if (node === END) {
      this.answer = chon;
      return;
    }
    this.visit[node] = true;

    const linkedPeople = this.getLinkedNodes(node);

    for (let i = 0; i < linkedPeople.length; i++) {
      if (!this.visit[linkedPeople[i]]) {
        this.dfs(linkedPeople[i], chon + 1);
      }
    }
  }
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [START, END] = inputStrings[1].split(" ").map(Number);

const graph = new Graph(+inputStrings[0]);
init();
graph.dfs(START, 0);
console.log(graph.answer);

function init() {
  for (let i = 3; i < inputStrings.length; i++) {
    const [parent, boy] = inputStrings[i].split(" ").map(Number);
    graph.addNode(parent, boy);
  }
}
