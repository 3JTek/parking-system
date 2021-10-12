var expect = require("chai").expect

const { calculateFuelToAdd, calculateParkingFee, calculatePrice } = require("../src/modules/generateJobs")

describe(`Every car with 10% or less fuel, will be refueled
to maximum capacity.`, () => {
  it("Should not refill car with more than 10% fuel level", () => {
    let fuelToAdd

    fuelToAdd = calculateFuelToAdd(0.11, 40)
    expect(fuelToAdd).equal(0)

    fuelToAdd = calculateFuelToAdd(0.99, 89)
    expect(fuelToAdd).equal(0)
  })

  it("Should refill car with 10% or less fuel level", () => {
    let fuelToAdd

    fuelToAdd = calculateFuelToAdd(0.04, 66)
    expect(fuelToAdd).equal(63.36)

    fuelToAdd = calculateFuelToAdd(0.1, 98)
    expect(fuelToAdd).equal(88.2)
  })
})

describe(`Small cars pay a flat rate of $25 for parking
 and large vehicles pay $35`, () => {
  it("Calculate fixed rate for cars", () => {
    const smallCarRate = calculateParkingFee("small")
    expect(smallCarRate).equal(25)

    const largeCarRate = calculateParkingFee("large")
    expect(largeCarRate).equal(35)
  })

  it("Should throw an error if carType invalid", () => {
    try {
      const carTypeInvalid = calculateParkingFee("medium")
    } catch (err) {
      expect(err.message).equal("Car Type invalid")
    }
  })
})

describe(`Price should be the addition of parking fee + refill cost.`, () => {
  it("Calculate fixed rate for cars", () => {
    let price
    price = calculatePrice(25, 145.3)
    expect(price).equal(279.28)

    price = calculatePrice(35, 0)
    expect(price).equal(35)
  })
})
