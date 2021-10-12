//Helpers
import { roundToPrecision2, pipe } from "./helpers/helperFunctions"

//Functions
import { calculateFixedRate, calculateRefillCost } from "./functions"

function addFixedRate(jobs: IJob[]) {
  return jobs.map((job) => {
    const fixedPrice = calculateFixedRate(job.size)
    return { ...job, fixedPrice: fixedPrice }
  })
}

function addRefillCost(jobs: IJob[]) {
  return jobs.map((job) => {
    const { level, capacity } = job.fuel
    const { fuelToAdd, refillCost } = calculateRefillCost(level, capacity)
    return { ...job, fuelToAdd, refillCost }
  })
}

function calculateTotalPrice(jobs: IJob[]) {
  return jobs.map((job) => ({ ...job, price: job.fixedPrice! + job.refillCost! }))
}

//Scenario 1: each job has an equivalent workload.
//- Therefore the cheapest jobs will be assigned to the employee with the lowest commission.
//- Each employees will have the same number of jobs.
//- If the number of jobs is odd, employee with the lowest commission will have 1 more job.
function assignJobsToEmployees(jobs: IJob[], employees: IEmployee[]) {
  const jobsSortedByPrice = jobs.sort((a, b) => a.price! - b.price!)
  const employeesSortedByComm = [...employees].sort((a, b) => a.commission - b.commission)

  const [nbOjJobs, nbOfEmployees] = [jobs.length, employees.length]

  const [minNbJobPerEmployee, nbJobsLeft] = [Math.floor(nbOjJobs / nbOfEmployees), nbOjJobs % nbOfEmployees]

  console.log("average", minNbJobPerEmployee)
  console.log("extra", nbJobsLeft)

  const employeeIdJobMapping: string[] = employeesSortedByComm.reduce((acc: string[], employee, index) => {
    const nbJobsForThisEmployee = index < nbJobsLeft ? minNbJobPerEmployee + 1 : minNbJobPerEmployee
    for (let i = 0; i < nbJobsForThisEmployee; i += 1) {
      acc.push(employee.id)
    }
    return acc
  }, [])

  console.log(employeeIdJobMapping)

  return jobsSortedByPrice.map((job, index) => ({
    licencePlate: job.licencePlate,
    employee: employeeIdJobMapping[index],
    fuelAdded: job.fuelToAdd, // Amount of fuel added in litres
    price: job.price,
  }))
}

export default function runScenario1(jobSummary: IJob[], employees: IEmployee[]) {
  try {
    const calculateJobs = (...fns: Function[]) => fns.reduce(pipe)
    const jobs: IJob[] = calculateJobs(addFixedRate, addRefillCost, calculateTotalPrice)(jobSummary)

    return assignJobsToEmployees(jobs, employees)
  } catch (err) {
    console.error(err)
  }
}

interface IJob {
  licencePlate: string
  size: string
  fuel: {
    capacity: number
    level: number
  }
  fixedPrice?: number
  fuelToAdd?: number
  refillCost?: number
  price?: number
  workload?: number
}

interface IAssignment {
  licencePlate: string
  employee: string
  fuelAdded: number | undefined // Amount of fuel added in litres
  price: number | undefined
}

interface IEmployee {
  id: string
  commission: number
}
