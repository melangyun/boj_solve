const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const string = require("fs").readFileSync(filePath).toString().trim();
solution(string);

function solution(string){
    const stack = [];

    for(let i = 0 ; i < string.length; i++){
        if(stack[stack.length -1] === "(" && string[i]=== ")") stack.pop();
        else stack.push(string[i]);
    }
    console.log(stack.length);
}