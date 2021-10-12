// Helpers
import roundToPrecision2 from "../helpers/helperFunctions"

// Constants
import { WORKLOAD_PER_LITRE, WORKLOAD_PER_CAR } from "../config/constants"

// Interfaces
import { IAssignment, IEmployee } from "../index"

export function assessJobWorkload(job: IAssignment) {
  const { price, fuelAdded, licencePlate } = job

  const workload = Math.floor(WORKLOAD_PER_CAR + fuelAdded * WORKLOAD_PER_LITRE)
  const ratioPriceWorkload = roundToPrecision2(price / workload)

  return {
    licencePlate,
    price,
    workload,
    ratioPriceWorkload,
  }
}

export function canAssignToEmployee(averageWorkloadPerEmployee: number): (arg: number) => boolean {
  let employeeWorkload = 0

  return (jobWorkload: number) => {
    if (employeeWorkload < averageWorkloadPerEmployee) {
      employeeWorkload += jobWorkload
      return true
    }
    return false
  }
}

// In the following scenario, we will assess the employee's workload for each assignment in unit of value.
// The workload will be calculated based on the car and the nb of litre if a refill is necessary.
// Then we will calculate the ratio price/workload. This ratio will help us determining which employees should take on which assignment:
// - e.g.: a assignment with a high workload (which will take time) and a low price should be assigned to an employee with high commission.
export default function assignJobsToEmployees(jobs: IAssignment[], employees: IEmployee[]): IAssignment[] {
  // Calcul workload and ratio price/workload for watch employee and sort by ratio
  const workloadArr = jobs.map(assessJobWorkload).sort((a, b) => b.ratioPriceWorkload - a.ratioPriceWorkload)

  const [lowCommEmployee, highCommEmployee] = employees.sort((a, b) => a.commission - b.commission)

  const nbOfEmployees = employees.length

  // This tell us what workload in average should take on each employee
  const averageWorkloadPerEmployee = workloadArr.reduce((acc, el) => acc + el.workload, 0) / nbOfEmployees

  // Using a closure to create a function that can tell us if low comm employee can still take on more load
  const canAssignToLowCommEmployee = canAssignToEmployee(averageWorkloadPerEmployee)

  // Returning the final assignment array (sorted...)
  return workloadArr
    .map((item) => ({
      licencePlate: item.licencePlate,
      employee: canAssignToLowCommEmployee(item.workload) ? lowCommEmployee.id : highCommEmployee.id,
      fuelAdded: jobs.find((el) => el.licencePlate === item.licencePlate)!.fuelAdded,
      price: jobs.find((el) => el.licencePlate === item.licencePlate)!.price,
    }))
    .sort((a, b) => (a.licencePlate > b.licencePlate ? 1 : -1))
}
