const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [_, operators,...n] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const numbers = n.map(Number);
const mappedFormula = operators.split("").map(operator => 
    operator.charCodeAt() >= 65 
    ? numbers[operator.charCodeAt() - 65]
    : operator);
solution(mappedFormula);

// 후위표기식
function solution(formulaList){
    const stack = [];
    for(const formula of formulaList){
        if(typeof formula === "number"){
            stack.push(formula);
            continue;
        }
        
        const num1 = stack.pop();
        const num2 = stack.pop();
        if(formula === "+") stack.push(num2 + num1);
        else if (formula === "-") stack.push(num2 - num1);
        else if (formula === "/") stack.push(num2 / num1);
        else if(formula === "*") stack.push(num2 * num1)
    }
    console.log(stack[0].toFixed(2));
}