const logs = require("../logs/run_log.json");
const logData = logs.map((log) => {
  return {
    name: log.name,
    description: log.description,
    case_no: log.case_no,
    path: log.path,
    method: log.method,
    error: log.responseBody.error,
    message: log.responseBody.message,
  };
});

console.table(logData);