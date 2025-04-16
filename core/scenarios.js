const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const command = args[0];

const unitPath = path.join(__dirname, "../scripts/units");
const integrationPath = path.join(__dirname, "../scripts/integrations");

function getJsonFiles(directory, isIntegration = false) {
  const files = [];

  function traverseDir(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        traverseDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        files.push(fullPath);
      }
    });
  }

  traverseDir(directory);

  return files.flatMap((filePath) => {
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (isIntegration) {
      return content.map((entry) => ({
        case_no: entry.case_no,
        description: entry.description,
        sequence: entry.sequence.map((seq) => seq.name),
      }));
    } else {
      return content.flatMap((entry) =>
        entry.scenarios.map((scenario) => ({
          file: path.relative(directory, filePath),
          name: entry.name,
          case_no: scenario.case_no,
          description: scenario.description,
        }))
      );
    }
  });
}

if (command === "units") {
  console.log("Unit Scenarios:");
  console.table(getJsonFiles(unitPath));
} else if (command === "integrations") {
  console.log("Integration Scenarios:");
  console.table(getJsonFiles(integrationPath, true));
} else {
  console.log("Unit Scenarios:");
  console.table(getJsonFiles(unitPath));
  console.log("Integration Scenarios:");
  console.table(getJsonFiles(integrationPath, true));
}
