const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [inputStr, bomb] = require("fs").readFileSync(filePath).toString().trim().split("\n");
solution(inputStr);

// 1트
// function solution(string, bomb){
//     while(string.split(bomb).length !== 1){
//         string = string.split(bomb).join(""); 
//         if(string.length === 0){
//             return console.log("FRULA");
//         }
//     }
//     console.log(string);
// }

// 2트
function solution(inputStr){
    const stack = [];
    let top = -1;

    for(let i = 0 ; i < inputStr.length ; i++){
        stack[++top] = inputStr[i];
        if (isLastIndexOfBomb(stack[top]) && isBomb(stack, top)){
            top -= bomb.length;
        }
    }
    console.log(top === -1 ? "FRULA" : stack.filter((char, i) => i <= top).join(""));
}

function isLastIndexOfBomb(char){
    return bomb[bomb.length-1] === char;
}

function isBomb(stack, top){
    if(top < bomb.length -1){
        return false;
    }
    for(let i = 1 ; i <= bomb.length ; i++){
        if(stack[top - i + 1] !== bomb[bomb.length - i]){
            return false;
        }
    }

    return true;
}