export {};
// https://www.acmicpc.net/problem/10026
// 적록색약

type Node = { x: number; y: number };

class Queue<T> {
  constructor(private queue: T[] = [], private head = 0) {}

  enqueue(input: T) {
    this.queue.push(input);
  }

  dequeue(): T | null {
    return this.isEmpty() ? null : this.queue[this.head++];
  }

  isEmpty(): boolean {
    return this.queue.length - this.head === 0;
  }
}

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const SIZE = Number(inputStrings[0].trim());

const picture: string[][] = [];
const greenPicture: string[][] = [];
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

init();
solution();

function init() {
  for (let i = 1; i < inputStrings.length; i++) {
    picture.push(inputStrings[i].split(""));
    greenPicture.push(inputStrings[i].replace(/R/gi, "G").split(""));
  }
}

function solution() {
  console.log(`${getZoneCount(picture)} ${getZoneCount(greenPicture)}`);
}

function getZoneCount(pictures: string[][]) {
  const queue = new Queue<Node>();
  const visit = Array.from(Array(SIZE)).map(_ => Array(SIZE).fill(false));
  let zoneCnt = 0;

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (visit[i][j]) continue;

      queue.enqueue({ x: i, y: j });
      zoneCnt++;

      while (!queue.isEmpty()) {
        const node = queue.dequeue();

        if (node === null) break;

        for (let k = 0; k < 4; k++) {
          const nx = dx[k] + node.x;
          const ny = dy[k] + node.y;

          if (nx < 0 || nx >= SIZE || ny < 0 || ny >= SIZE) {
            continue;
          }

          if (pictures[node.x][node.y] === pictures[nx][ny] && !visit[nx][ny]) {
            queue.enqueue({ x: nx, y: ny });
            visit[nx][ny] = true;
          }
        }
      }
    }
  }

  return zoneCnt;
}
