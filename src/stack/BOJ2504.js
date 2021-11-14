const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const string = require("fs").readFileSync(filePath).toString().trim();
const open = {"(": 2, "[": 3};
const close = {")": 2, "]":3 };

solution(string);

function solution(string){
    if(string.length % 2 !== 0 ) return console.log(0);
    
    const stack= [];
    let top =  -1;

    for(let i = 0 ; i < string.length ; i++ ){
        const char = string[i];

        if(open[char] && i !== string.length-1){
            stack[++top] = char;
        }
        else if(open[stack[top]] && open[stack[top]] === close[char]){
            stack[top] = close[char];
        }
        else if(typeof stack[top] === "number" && open[stack[top-1]] && open[stack[top-1]] === close[char]){
            stack[top -1] = stack[top] * close[char];
            top--;
        }
        else {
            return console.log(0);
        }

        while(typeof stack[top] === "number" && typeof stack[top-1] === "number"){
            stack[top-1] = stack[top] + stack[top-1];
            top--;
        }
    }

    console.log(top !== 0 ? 0 : stack[top]);
}