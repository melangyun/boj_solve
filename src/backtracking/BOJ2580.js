const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const SIZE = 9;
const map = inputStrings.map(text => text.split(" ").map(Number));
const zeroList = [];
findZero();
backTracking(0);

function findZero(){
    for(let x = 0 ; x < SIZE ; x++){
        for(let y = 0 ; y < SIZE; y++){
            if(map[x][y] === 0) zeroList.push({x, y});
        }
    }
}

function backTracking(now){
    if(now === zeroList.length){
        console.log(map.reduce((answer, value)=> answer + value.join(" ")+ "\n",""));
        process.exit(0);
    }

    const node = zeroList[now];
    for(let i = 1 ; i <= SIZE ; i++){
        if(isPossible(node, i)){
            map[node.x][node.y] = i;
            backTracking(now + 1);
            map[node.x][node.y] = 0;
        }
    }
}

function isPossible(node, value){
    const {x, y} = node;

    for(let i = 0 ; i < SIZE ; i++){
        if(map[x][i] === value) return false;
    }

    for(let i = 0 ; i < SIZE ; i++){
        if(map[i][y] === value) return false;
    }

    const startX = Math.floor(x/3) *3;
    const startY = Math.floor(y/3) *3;
    for(let i = startX; i < startX + 3 ; i++){
        for(let j = startY ; j < startY + 3 ; j++){
            if(map[i][j]=== value) return false;
        }
    }

    return true;
}