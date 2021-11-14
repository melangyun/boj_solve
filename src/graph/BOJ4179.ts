export {};
// https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files

const [numbers, ...spacesStrList] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
const [height, transverse] = numbers.split(" ").map(Number);
const space: string[][] = [];
spacesStrList.forEach((spaceStr: string) => space.push(spaceStr.split("")));

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
type Pair = { x: number; y: number };

solution();

function solution() {
  const fireQueue = new Queue<Pair>();
  const fireVisitedSpace = Array.from(Array(height)).map(_ =>
    Array(transverse).fill(-1),
  );
  const runningQueue = new Queue<Pair>();
  const runAbleSpace = Array.from(Array(height)).map(_ =>
    Array(transverse).fill(-1),
  );
  for (let x = 0; x < space.length; x++) {
    for (let y = 0; y < space[x].length; y++) {
      if (space[x][y] === "F") {
        fireQueue.enqueue({ x, y });
        fireVisitedSpace[x][y] = 0;
      } else if (space[x][y] === "J") {
        runningQueue.enqueue({ x, y });
        runAbleSpace[x][y] = 0;
        if (x === 0 || x === height - 1 || y === 0 || y === transverse - 1) {
          return console.log(1);
        }
      }
    }
  }

  const bx = [1, 0, -1, 0];
  const by = [0, 1, 0, -1];

  while (!fireQueue.isEmpty()) {
    const pair = fireQueue.dequeue();
    if (!pair) {
      break;
    }

    for (let i = 0; i < 4; i++) {
      const nx = bx[i] + pair.x;
      const ny = by[i] + pair.y;

      if (nx < 0 || nx >= height || ny < 0 || ny >= transverse) {
        continue;
      }
      if (space[nx][ny] === "." && fireVisitedSpace[nx][ny] === -1) {
        fireVisitedSpace[nx][ny] = fireVisitedSpace[pair.x][pair.y] + 1;
        fireQueue.enqueue({ x: nx, y: ny });
      }
    }
  }

  while (!runningQueue.isEmpty()) {
    const pair = runningQueue.dequeue();
    if (!pair) {
      break;
    }

    for (let i = 0; i < 4; i++) {
      const nx = bx[i] + pair.x;
      const ny = by[i] + pair.y;

      if (nx < 0 || nx >= height || ny < 0 || ny >= transverse) {
        continue;
      }
      if (
        space[nx][ny] === "." &&
        (fireVisitedSpace[nx][ny] === -1 ||
          fireVisitedSpace[nx][ny] > runAbleSpace[pair.x][pair.y] + 1) &&
        runAbleSpace[nx][ny] === -1
      ) {
        if (
          nx === 0 ||
          nx === height - 1 ||
          ny === 0 ||
          ny === transverse - 1
        ) {
          return console.log(runAbleSpace[pair.x][pair.y] + 2);
        }
        runAbleSpace[nx][ny] = runAbleSpace[pair.x][pair.y] + 1;
        runningQueue.enqueue({ x: nx, y: ny });
      }
    }
  }
  console.log("IMPOSSIBLE");
}
