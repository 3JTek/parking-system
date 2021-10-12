var expect = require("chai").expect

const { assessJobWorkload, canAssignToEmployee } = require("../src/modules/assignJobToEmployee")

describe(`Calculate job workload and ratio price/workload`, () => {
  it("Should calculate workload and ratio for a job", () => {
    const job = {
      licencePlate: "A",
      employee: undefined,
      fuelAdded: 53.01,
      price: 127.77,
    }

    const { workload, ratioPriceWorkload } = assessJobWorkload(job)
    expect(workload).equal(259)
    expect(ratioPriceWorkload).equal(0.49)
  })
})

describe(`Employee should not exceed a certain workload`, () => {
  it("Should properly return whether or not an employee can still take on some work", () => {
    let employeeCanTakeOnMoreWorkload

    const canAssignToEmployee1 = canAssignToEmployee(100)

    employeeCanTakeOnMoreWorkload = canAssignToEmployee1(60)
    expect(employeeCanTakeOnMoreWorkload).equal(true)

    employeeCanTakeOnMoreWorkload = canAssignToEmployee1(50)
    expect(employeeCanTakeOnMoreWorkload).equal(true)

    employeeCanTakeOnMoreWorkload = canAssignToEmployee1(30)
    expect(employeeCanTakeOnMoreWorkload).equal(false)
  })
})
