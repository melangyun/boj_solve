//https://www.acmicpc.net/problem/1713
// 후보 추천하기

const inputStrings = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

// 누적 추천횟수, 최초 게시 시간,
const photoFrameCnt = Number(inputStrings[0]);
const recommendations = inputStrings[2].trim().split(" ").map(Number);
const photoFrames = new Map();

solution();

function solution() {
  for (let i = 0; i < recommendations.length; i++) {
    addPhoto(recommendations[i], i);
  }
  console.log([...photoFrames.keys()].sort((a,b)=> a-b).join(" "));
}

function addPhoto(student, time) {
  const postedStudent = photoFrames.get(student);
  // 이미 게시된 학생의 경우
  if (postedStudent) {
    postedStudent.point++;
    return;
  }

  // 프레임이 가득 차지 않은 경우
  if (photoFrames.size !== photoFrameCnt) {
    setPhotoFrame(student, time);
    return;
  }

  // 프레임이 가득 찬 경우
  // => 가장 표가 적은 학생
  // => 동점이라면, 처음 게시된 시간
  let min = 1000;
  let minStudents=[];
  for (const [student, information] of photoFrames) {
    if (information.point < min) {
      min = information.point;
      minStudents = [student];
    } else if (information.point === min) {
      minStudents.push(student);
    }
  }

  let deleteStudent = minStudents[0];
  let postTime = photoFrames.get(deleteStudent).postTime;

  for (let i = 1; i < minStudents.length; i++) {
    const student = minStudents[i];
    const pt = photoFrames.get(student).postTime;
    if (pt < postTime) {
      deleteStudent = student;
      postTime = pt;
    }
  }

  photoFrames.delete(deleteStudent);
  setPhotoFrame(student, time)
}

function setPhotoFrame(student, time){
    photoFrames.set(student, { postTime: time, point: 1 });
}
