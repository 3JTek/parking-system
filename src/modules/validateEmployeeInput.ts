import { IEmployee } from "../index"

export default function validateEmployeeInput(employeesInput: IEmployee[]): void {
  const error: string[] = []

  employeesInput.forEach((employee) => {
    if (typeof employee.id !== "string") error.push("Employee id needs to be a string")
    if (employee.commission < 0 || employee.commission > 1) error.push("Employee commission should be between 0 and 1")
  })

  if (error.length > 0) throw new Error(error.join(", "))
}
