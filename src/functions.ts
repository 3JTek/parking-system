import { roundToPrecision2 } from "./helpers/helperFunctions"

export function calculateFixedRate(carType: string): number {
  if (carType === "large") return 35
  if (carType === "small") return 25
  throw new Error("Car Type invalid")
}

export function calculateRefillCost(level: number, capacity: number): { fuelToAdd: number; refillCost: number } {
  if (capacity < 0) throw new Error("Level should be a positive number")
  if (level < 0 || level > 1) throw new Error("Capacity value should be between 0 and 1")

  //Return $0 if capacity above 10%
  if (level > 0.1) return { fuelToAdd: 0, refillCost: 0 }

  const pricePerLitre = 1.75

  const fuelToAdd = roundToPrecision2((1 - level) * capacity)
  const refillCost = Math.round(fuelToAdd * pricePerLitre * 100) / 100

  //TODO: Math.Round is not the perfect method to round a number => https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  return { fuelToAdd, refillCost }
}
