// https://www.acmicpc.net/problem/2065
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [numbers, ...peopleArrivedList] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [receivableNum, crossRiverTime, _] = numbers.split(" ").map(Number);

solution(peopleArrivedList);

function solution(peopleArrivedList){

    const leftQueue = [];
    const rightQueue = [];
    let leftQueueHead = 0;
    let rightQueueHead = 0;
    peopleArrivedList.forEach((info, i) => {
        const [time, direction] = info.split(" ");
        if(direction === "left") leftQueue.push({time: +time, i});
        else rightQueue.push({time: +time, i});
    });
    
    const answer = [];
    let location = "left";
    let now = 0;
    
    while(true){
        if(location === "left"){
            const leftGuest = leftQueue[leftQueueHead];
            const rightGuest = rightQueue[rightQueueHead];
            
            if(!rightGuest || leftGuest && leftGuest.time <= rightGuest.time){
                if(leftGuest.time >= now){
                    now = leftGuest.time;
                }
            }else { 
                if(rightGuest.time >= now){
                    now = rightGuest.time;
                }
            }

            for(let i = 0 ; i < receivableNum ; i++){
                const el = leftQueue[leftQueueHead];
                if( el && el.time <= now) {
                    answer[el.i] = now + crossRiverTime;
                    leftQueueHead++;
                }else {
                    break;
                }
            }
        }
        else if(location === "right"){
            const leftGuest = leftQueue[leftQueueHead];
            const rightGuest = rightQueue[rightQueueHead];

            if(!leftGuest || rightGuest && rightGuest.time <= leftGuest.time){
                now = rightGuest.time < now ? now : rightGuest.time;
            }else {
                now = leftGuest.time < now ? now : leftGuest.time;
            }

            for(let i = 0 ; i < receivableNum ; i++){
                const el = rightQueue[rightQueueHead];
                if(el && el.time <= now) {
                    answer[el.i] = now + crossRiverTime;
                    rightQueueHead++;
                }else {
                    break;
                }
            }
        }

        now += crossRiverTime;
        location = location === "right" ? "left" : "right";

        if(leftQueueHead === leftQueue.length
            && rightQueueHead === rightQueue.length){
            break;
        }
    }

    console.log(answer.join("\n"));
}