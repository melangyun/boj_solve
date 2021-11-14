
function getPassword(input) {
  return { key: input ? undefined : false };
}

console.log("getPassword(true):", getPassword(true));
console.log(getPassword(true)?.key);
// console.log(getPassword(true)?.key === false);
