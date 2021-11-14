class Queue{
    constructor(){
        this.queue = [];
        this.head = 0;
    }

    enqueue(value){
        this.queue.push(value);
    }

    dequeue(){
        if(this.head === 1000){
            this.head = 0;
            this.queue.splice(0, 1000);
        }
        return this.isEmpty()? undefined: this.queue[this.head++];
    }

    isEmpty(){
        return this.queue.length === this.head;
    }
}

const inputStrings = require("fs").readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt").toString().trim().split("\n");

const [R, C] = inputStrings[0].split(" ").map(Number);
const d = [
[-1, 1, 0, 0],
[0, 0, -1, 1],
];
const map = [];
const iceMeltMap = Array.from(Array(R)).map(_ => Array(C).fill(-1));
let swanMap;
const swans= [];
const queue = new Queue();

init();
solution();

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    map.push(inputStrings[i].split(""));
  }
}

// "." => 물, "X" => 빙판, "L" => 백조
function solution() {
    // 1. 얼음은 언제 녹을까? -> 시작점이 여러개인 BFS
    for (let r = 0; r < map.length; r++) {
      for (let c = 0; c < map[r].length; c++) {
        if (map[r][c] === "X") continue;
        if (map[r][c] === "L") {
          swans.push({ r, c });
        }
        queue.enqueue({ r, c });
        iceMeltMap[r][c] = 0;
      }
    }

    bfs(iceBFSCondition);
    // 0일에 대한 bfs
    for (let day = 0; day > 0; day++) {
      swanMap = Array.from(Array(R)).map(_ => Array(C).fill(false));
      swanMap[swans[0].r][swans[0].c] = true;
      queue.enqueue(swans[0]);
  
      bfs(findSwanCondition);
    }
  }
  
  function bfs(condition, day) {
    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      if (node === undefined) break;
  
      for (let i = 0; i < 4; i++) {
        const nr = node.r + d[0][i];
        const nc = node.c + d[1][i];
  
        if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
        condition(queue, node, nr, nc, day);
      }
    }
  }
  
  function iceBFSCondition(queue, node, nr, nc) {
    if (visit[0][nr][nc] !== -1 || map[nr][nc] !== "X") return;
    visit[0][nr][nc] = visit[0][node.r][node.c] + 1;
    queue.enqueue({ r: nr, c: nc });
  }
  