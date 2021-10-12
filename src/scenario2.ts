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

function calculateJobWorkload(jobs: IJob[]) {
  return jobs.map((job) => ({ ...job, workload: 100 + Math.floor(job.fuelToAdd! * 3) }))
}

//Scenario 2: we are going to try take into consideration the time needed for a car refill.
//We are going to weight any car with a "100" points and any litre added to a car with "3" points
//This configurable system could help the parking manager balance the employee workload properly
function assignJobsToEmployees(jobs: IJob[], employees: IEmployee[]) {
  const jobWithRatio: IJob[] = jobs.map((job) => ({ ...job, ratio: Math.floor(job.price! / job.workload!) }))
  const jobWithRatioSorted: IJob[] = jobWithRatio.sort((a, b) => a.ratio! - b.ratio!)

  const averageWorkload =
    jobs.reduce((acc, job: IJob) => {
      return acc + job.workload!
    }, 0) / employees.length

  console.log(averageWorkload)

  let employeeWorkload: number[] = []

  const finalJobs = jobWithRatioSorted.map((job) => {
    if (employeeWorkload[employeeWorkload.length - 1] < averageWorkload) {
      employeeWorkload[employeeWorkload.length - 1] += job.workload!
    } else {
      employeeWorkload.push(job.workload!)
    }
  })

  console.log(employeeWorkload)
}

export default function runScenario2(jobSummary: IJob[], employees: IEmployee[]) {
  try {
    const calculateJobs = (...fns: Function[]) => fns.reduce(pipe)
    const jobs: IJob[] = calculateJobs(
      addFixedRate,
      addRefillCost,
      calculateTotalPrice,
      calculateJobWorkload
    )(jobSummary)

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
  ratio?: number
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
