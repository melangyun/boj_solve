const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [numbers, ...mazeStrList] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const LocationNumber = numbers.split(" ");
const target = { x: Number(LocationNumber[0])-1, y: Number(LocationNumber[1])-1};
const maze = [];
mazeStrList.forEach(mazeStr => {
    maze.push(mazeStr.split("").map(Number));
});
 
class Queue {
    constructor(){
        this.queue = [];
    }

    enqueue(x, y){
        this.queue.push({x, y});
    }

    dequeue(){
        return this.queue.shift();
    }

    isEmpty(){
        return this.queue.length === 0;
    }
}

solution(target, maze);

function solution(target, maze){
    const length = maze.length;
    const transverse = maze[0].length;
    const distanceArr = Array.from(Array(length)).map(_ => Array.from(Array(transverse)).fill(0));
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    const queue = new Queue();
    queue.enqueue(0,0);
    distanceArr[0][0] = 1;
   
    while(!queue.isEmpty()){
        const pair = queue.dequeue();

        for(let i = 0; i < 4 ; i ++){
            const nx = pair.x + dx[i];
            const ny = pair.y + dy[i];
            if(nx < 0 || nx >= length || ny  < 0 || ny >= transverse){
                continue;
            }
            if(maze[nx][ny] === 1 && !distanceArr[nx][ny]){
                distanceArr[nx][ny] = distanceArr[pair.x][pair.y] + 1;
                queue.enqueue(nx, ny);
                if(nx === target.x && ny === target.y){
                    return console.log(distanceArr[nx][ny]);
                }
            }
        }
    }
}