//[2573] 빙산 2019.11.28 목 11:05
const line = require("fs").readFileSync("/dev/stdin", "utf8");
// TODO : 다른 사람 코드 보고 분석

let data = line.trim().split("\n");
const firstRow = data
  .shift()
  .trim()
  .split(" ")
  .map(v => Number(v));

let bingha = [];
const xAxis = [0, 0, 1, -1];
const yAxis = [1, -1, 0, 0];
data.forEach((v, i) => {
  data[i] = v
    .trim()
    .split(" ")
    .map((v, j) => {
      if (v > 0) {
        bingha.push({ x: i, y: j, cnt: Number(v) });
      }
      return Number(v);
    });
});
const R = firstRow[0]; //행
const C = firstRow[1]; //열
let melCnt = 0;

while (bingha.length > 0) {
  bfs();
  melt();
  melCnt++;
}
console.log(0);

function melt() {
  for (let i = 0; i < bingha.length; i++) {
    for (let k = 0; k <= 3; k++) {
      const { x, y, cnt } = bingha[i];
      const xX = x + xAxis[k];
      const yY = y + yAxis[k];
      if (xX > -1 && xX < R && yY > -1 && yY < C) {
        if (data[xX][yY] === 0 && cnt > 0) {
          bingha[i].cnt = cnt - 1;
        }
      }
    }
  }
  //물녹는 값 갱신을 for문 순회 후 반영해야함(0이 된 bing값이 다른 빙하에 영향 방지)
  const isZero = obj => {
    data[obj.x][obj.y] = obj.cnt;
    if (obj.cnt === 0) {
      return false;
    } else {
      return true;
    }
  };

  bingha = bingha.filter(isZero);
}

function bfs() {
  const queue = new Queue();
  const chk = [];
  let bingCnt = 0;
  data.forEach((v, i) => {
    chk[i] = Array(C).fill(-1);
  });
  for (let i = 0; i < bingha.length; i++) {
    const { x, y, cnt } = bingha[i];

    if (cnt > 0 && chk[x][y] === -1) {
      chk[x][y] = 1;
      bingCnt++;
      queue.enqueue({ x, y });
      while (queue.getLength() > 0) {
        const obj = queue.dequeue();
        for (let k = 0; k <= 3; k++) {
          const xX = obj.x + xAxis[k];
          const yY = obj.y + yAxis[k];
          if (xX > -1 && xX < R && yY > -1 && yY < C) {
            if (data[xX][yY] > 0 && chk[xX][yY] === -1) {
              chk[xX][yY] = bingCnt;
              queue.enqueue({ x: xX, y: yY });
            }
          }
        }
      }
    }
  }
  if (bingCnt > 1) {
    console.log(melCnt);
    process.exit(0);
  }
}

function Queue() {
  var queue = [];
  var offset = 0;

  this.getLength = function() {
    return queue.length - offset;
  };

  this.enqueue = function(item) {
    queue.push(item);
  };
  this.dequeue = function() {
    if (!queue.length) {
      return undefined;
    }

    var item = queue[offset];

    if (++offset * 2 >= queue.length) {
      queue = queue.slice(offset);
      offset = 0;
    }

    return item;
  };
}
