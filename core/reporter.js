const { execSync } = require("child_process");

const args = process.argv.slice(2);
const testType = args[0];

try {
  if (testType === "unit") {
    console.log("Running unit suites...");
    execSync("npx jest __tests__/unit.test.js", { stdio: "inherit" });
  } else if (testType === "integration") {
    console.log("Running integration suites...");
    execSync("npx jest __tests__/integration.test.js", { stdio: "inherit" });
  } else {
    console.log("Running all test suites...");
    execSync("npx jest __tests__/unit.test.js __tests__/integration.test.js", { stdio: "inherit" });
  }
} catch (error) {
  console.error("Error running tests:", error.message);
  process.exit(1);
}

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
