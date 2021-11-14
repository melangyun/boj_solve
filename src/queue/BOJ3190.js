// https://www.acmicpc.net/problem/3190
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [boardSize, appleCount, ...details] = require("fs").readFileSync(filePath).toString().trim().split("\n");
// 0으로 찬 게임 보드를 만든다.
// 뱀이 있는 자리는 1, 사과는 "A"
const board = Array.from(Array(+boardSize)).map( _ => Array(+boardSize).fill(0));
const cmds = {};
// 커맨드를 {"second": "dirction"} 로 변경
init();
solution(board, cmds);

function init(){
    board[0][0] = 1;
    for(let i = 0 ; i < +appleCount ; i++){
        const [x, y] = details[i].trim().split(" ");
        board[x-1][y-1] = "A";
    }
    
    let direction = "right";
    
    for(let i = +appleCount + 1; i < details.length ; i++){
        const [seconds , cmd] = details[i].trim().split(" ");
        
        if(direction === "left") direction = cmd === "L" ? "down" : "up";
        else if(direction === "right") direction = cmd === "L" ? "up" : "down";
        else if(direction === "up") direction = cmd === "L" ? "left" : "right";
        else if (direction === "down") direction = cmd === "L" ? "right" : "left";
        
        cmds[+seconds] = direction;
    }
    
}

function solution(board, cmds){
    let seconds = 0;
    let direction = "right";

    // x가 열이고, y가 행임
    const head = {x: 0, y: 0};
    let tailLocation = 0;
    const body = [{x: 0, y: 0}];
    
    while(true){
        seconds++;
        
        if(direction === "left") head.y--;
        else if(direction === "right") head.y++;
        else if(direction === "up") head.x--;
        else if(direction === "down") head.x++;

        // 만약 머리가 보드 밖으로 나가거나, 머리의 위치에 뱀의 자신이 있다면 게임 종료
        if(head.y < 0 || head.y >= boardSize ||
            head.x < 0 || head.x >= boardSize ||
            board[head.x][head.y] === 1){
            return console.log(seconds);
        }
        
        // 1초 이후에 사과를 먹지 않았을 경우에만 몸 꼬리를 옮김
        if(board[head.x][head.y] !== "A"){
            // 게임 판에서 꼬리를 치움
            board[body[tailLocation].x][body[tailLocation].y] = 0;
            // queue에서 꼬리를 뺌 (dequeue)
            tailLocation++;
        }
        
        // 머리 표기, 몸통에 머리를 넣음
        board[head.x][head.y] = 1;
        body.push({x : head.x, y: head.y});

        // 만약 해당하는 초에 방향전환이 있다면 방향전환
        if(cmds[seconds]){
            direction = cmds[seconds];
        }
    }
}
