const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [cnt, ...testCases] = fs.readFileSync(filePath).toString().split("\n");
solution(cnt, testCases);

function solution(cnt, inputs){
    if(cnt < 1) return;
    const cases = cnt === 1 ? [inputs] : inputs;
    cases.forEach(testCase => console.log(getPassword(testCase)));
}

function getPassword (inputList) {
    const prevStack = [];
    const converseStack = [];

    for(const char of inputList){
        if(char === "<"){
            if(prevStack.length === 0) continue;
            converseStack.push(prevStack.pop());
        }
        else if(char === ">"){
            if(converseStack.length === 0) continue;
            prevStack.push(converseStack.pop());
        }
        else if(char === "-"){
            if(prevStack.length === 0) continue;
            prevStack.pop();
        }
        else {
            prevStack.push(char);
        } 
    }

    return prevStack.join("") + converseStack.reverse().join("");
}