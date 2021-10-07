var expect = require("chai").expect

const { myFirstFunction } = require("../src/index")

it("My first test", function (done) {
  const result = myFirstFunction()
  expect(result).equal("Hello")
  done()
})
