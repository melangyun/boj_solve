const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [peopleNum, seq] = require("fs").readFileSync(filePath).toString().split(" ").map(Number);
solution(peopleNum, seq);

function solution(peopleNum, seq){
    const peopleArr = new Array(peopleNum).fill(0).map((el, i) => i + 1);
    let answer = "<";

    while (peopleArr.length) {
        for (let i = 0; i < seq; i++) {
            peopleArr.push(peopleArr.shift());
        }
        
        if(peopleArr.length === 1){
            answer += `${peopleArr.pop()}>`;
        } else {
            answer += `${peopleArr.pop()}, `;
        }
    }
    console.log(answer);
};