//Inputs
import jobSummary from "./inputJobs.json"
import employees from "./inputEmployees.json"

//Scenario
import runScenario1 from "./scenario1"
import runScenario2 from "./scenario2"

const scenario: number = 2

let result

if (scenario === 1) {
  result = runScenario1(jobSummary, employees)
} else if (scenario === 2) {
  result = runScenario2(jobSummary, employees)
} else {
  result = "Please select a existing scenario"
}

console.log(result)
