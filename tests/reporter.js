const results = require("../logs/result_log.json");

const successData = results.filter(
  (result) => result.result === "PASS"
);
const failureData = results.filter(
  (result) => result.result === "FAILED"
);

console.warn("PASS SCENARIO")
console.table(successData);

console.log("\x1b[31mFAILED SCENARIO\x1b[0m");
console.table(failureData);
