const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const command = args[0];

const unitPath = path.join(__dirname, "../scripts/units");
const integrationPath = path.join(__dirname, "../scripts/integrations");

function getJsonFiles(directory) {
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .flatMap((file) => {
      const filePath = path.join(directory, file);
      const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      return content.flatMap((entry) =>
        entry.scenarios.map((scenario) => ({
          file,
          name: entry.name,
          case_no: scenario.case_no,
          description: scenario.description,
        }))
      );
    });
}

if (command === "units") {
  console.log("Unit Scenarios:");
  console.table(getJsonFiles(unitPath));
} else if (command === "integrations") {
  console.log("Integration Scenarios:");
  console.table(getJsonFiles(integrationPath));
} else {
  console.log("Unit Scenarios:");
  console.table(getJsonFiles(unitPath));
  console.log("Integration Scenarios:");
  console.table(getJsonFiles(integrationPath));
}
