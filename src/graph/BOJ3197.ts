export {};
// https://www.acmicpc.net/problem/3197
// 백조의 호수
class Queue<T> {
  constructor(private queue: T[] = [], private head: number = 0) {}

  enqueue(value: T) {
    this.queue.push(value);
  }

  dequeue(): T | undefined {
    if (this.head === 300) {
      this.head = 0;
      this.queue.splice(0, 300);
    }
    return this.isEmpty() ? undefined : this.queue[this.head++];
  }

  isEmpty(): boolean {
    return this.queue.length === this.head;
  }
}

interface Node {
  r: number;
  c: number;
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

// 행, 열
const [R, C] = inputStrings[0].split(" ").map(Number);
const d = [
  [-1, 1, 0, 0],
  [0, 0, -1, 1],
];
const map: string[][] = [];

init();
solution();

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    map.push(inputStrings[i].split(""));
  }
}

// "." => 물, "X" => 빙판, "L" => 백조
function solution() {
  const iceMeltMap: number[][] = Array.from(Array(R)).map(_ =>
    Array(C).fill(-1),
  );
  const swans: Node[] = [];
  const queue = new Queue<Node>();

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

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    if (node === undefined) break;

    for (let i = 0; i < 4; i++) {
      const nr = node.r + d[0][i];
      const nc = node.c + d[1][i];

      if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
      if (iceMeltMap[nr][nc] !== -1 || map[nr][nc] !== "X") continue;

      iceMeltMap[nr][nc] = iceMeltMap[node.r][node.c] + 1;
      queue.enqueue({ r: nr, c: nc });
    }
  }

  for (let day = 0; day > -1; day++) {
    const swanMap = Array.from(Array(R)).map(_ => Array(C).fill(false));
    swanMap[swans[0].r][swans[0].c] = true;
    queue.enqueue(swans[0]);

    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      if (node === undefined) break;

      for (let i = 0; i < 4; i++) {
        const nr = node.r + d[0][i];
        const nc = node.c + d[1][i];

        if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;

        if (swanMap[nr][nc] === true || iceMeltMap[nr][nc] > day) continue;
        if (swans[1].r === nr && swans[1].c === nc) {
          return console.log(day);
        }
        swanMap[nr][nc] = true;
        queue.enqueue({ r: nr, c: nc });
      }
    }
  }
}
