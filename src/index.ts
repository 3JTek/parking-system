//Inputs
import parkingListing from "./test-data/inputParkingListing.json"
import employees from "./test-data/inputEmployees.json"

//Validations
import validateParkingListingInput from "./modules/validateParkingListingInput"
import validateEmployeeInput from "./modules/validateEmployeeInput"

//Modules
import generateJobs from "./modules/generateJobs"
import assignJobToEmployee from "./modules/assignJobToEmployee"

try {
  //Input validations
  validateEmployeeInput(employees)
  validateParkingListingInput(parkingListing)

  //Assignment process
  const jobs: IAssignment[] = generateJobs(parkingListing)
  const assignments: IAssignment[] = assignJobToEmployee(jobs, employees)

  //Result
  console.log(assignments)
} catch (err) {
  console.error("An error occurred during the process err => ", err)
}

export interface IParkingItem {
  licencePlate: string
  size: string
  fuel: {
    capacity: number
    level: number
  }
}

export interface IEmployee {
  id: string
  commission: number
}

export interface IAssignment {
  licencePlate: string
  employee: string | undefined
  fuelAdded: number
  price: number
}
