export {};

function getPassword(input: boolean) {
  return { key: input ? undefined : false };
}

console.log("getPassword(true):", getPassword(true));
console.log("getPassword(true)?.key ", getPassword(true)?.key);
console.log(
  "getPassword(true)?.key === false:",
  getPassword(true)?.key === false,
);
