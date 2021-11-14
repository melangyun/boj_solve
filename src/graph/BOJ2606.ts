export {};
// https://www.acmicpc.net/problem/2606
// 바이러스

class Graph {
  constructor(private graph = {}) {}

  addPair(start: string, end: string) {
    this.addNode(start, end);
    this.addNode(end, start);
  }

  getLinkedNode(node: string) {
    return this.graph[node] || [];
  }

  private addNode(start: string, end: string) {
    if (this.graph.hasOwnProperty(start)) this.graph[start].push(end);
    else this.graph[start] = [end];
  }
}
const START_COMPUTER = "1";

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const computerCnt = Number(inputStrings[0]);
const visit = new Array(computerCnt + 1);
const graph = new Graph();
let count = -1;

init();
dfs(START_COMPUTER);
console.log(count);

function init() {
  for (let i = 2; i < inputStrings.length; i++) {
    const [start, end] = inputStrings[i].split(" ");
    graph.addPair(start, end);
  }
}

function dfs(computer: string) {
  visit[computer] = true;
  count++;
  graph.getLinkedNode(computer).forEach((linkedNode: string) => {
    if (!visit[linkedNode]) dfs(linkedNode);
  });
}
