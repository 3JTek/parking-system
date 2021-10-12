var expect = require("chai").expect

const { calculateFixedRate, calculateRefillCost } = require("../src/index")

describe(`Small cars pay a flat rate of $25 for parking
 and large vehicles pay $35`, () => {
  it("Calculate fixed rate for cars", () => {
    const smallCarRate = calculateFixedRate("small")
    expect(smallCarRate).equal(25)

    const largeCarRate = calculateFixedRate("large")
    expect(largeCarRate).equal(35)
  })

  it("Should throw an error if carType invalid", () => {
    try {
      const carTypeInvalid = calculateFixedRate("medium")
    } catch (err) {
      expect(err.message).equal("Car Type invalid")
    }
  })
})

describe(`Every car with 10% or less fuel, will be refueled
 to maximum capacity and charged the fuel amount $1.75/litre.`, () => {
  it("Should not refill car with more than 10% fuel level", () => {
    let result

    result = calculateRefillCost(0.11, 40)
    expect(result.fuelToAdd).equal(0)
    expect(result.refillCost).equal(0)

    result = calculateRefillCost(0.99, 89)
    expect(result.fuelToAdd).equal(0)
    expect(result.refillCost).equal(0)
  })

  it("Should refill car with 10% or less fuel level", () => {
    let result

    result = calculateRefillCost(0.04, 66)
    expect(result.fuelToAdd).equal(63.36)
    expect(result.refillCost).equal(110.88)

    result = calculateRefillCost(0.1, 98)
    expect(result.fuelToAdd).equal(88.2)
    expect(result.refillCost).equal(154.35)
  })
})
