class Graph {
    constructor(peopleNumber) {
      this.peopleNumber = peopleNumber;
      this.data = new Map();
      this.visit = new Array(peopleNumber);
      this.answer = 0;
    }
  
    addNode(start, end) {
      this.addSingleNode(start, end);
      this.addSingleNode(end, start);
    }
  
    findCycle() {
      for (let [node, linkedNodes] of this.data) {
        if (!this.visit[node] && this.answer === 0) {
          this.dfs(node, 0);
        }
        if (this.answer) {
          break;
        }
      }
  
      return this.answer;
    }
  
    dfs(node, cycle) {
      this.visit[node] = true;
      if (cycle === 4) {
        this.answer = 1;
        return;
      }
  
      const linkedPeople = this.getLinkedNodes(node);
      for (let i = 0; i < linkedPeople.length; i++) {
        if (this.visit[linkedPeople[i]]) continue;
        
        this.dfs(linkedPeople[i], cycle + 1);
        if (this.answer) return;
      }
      this.visit[node] = false;
    }
  
    addSingleNode(start, end) {
      this.data.has(start)
        ? this.data.get(start).push(end)
        : this.data.set(start, [end]);
    }
  
    getLinkedNodes(node) {
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
  