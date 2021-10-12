// Helpers
import roundToPrecision2 from "../helpers/helperFunctions"

// Interfaces
import { IParkingItem, IAssignment } from "../index"

// Constants
import { PRICE_PER_LITRE } from "../config/constants"

export function calculateFuelToAdd(level: number, capacity: number): number {
  if (capacity < 0) throw new Error("Level should be a positive number")
  if (level < 0 || level > 1) throw new Error("Capacity value should be between 0 and 1")

  // Return $0 if capacity above 10%
  if (level > 0.1) return 0

  return roundToPrecision2((1 - level) * capacity)
}

export function calculateParkingFee(carType: string): number {
  if (carType === "large") return 35
  if (carType === "small") return 25
  throw new Error("Car Type invalid")
}

export function calculatePrice(parkingFee: number, fuelAdded: number): number {
  return parkingFee + roundToPrecision2(fuelAdded * PRICE_PER_LITRE)
}

export default function generateJobs(parkingListing: IParkingItem[]): IAssignment[] {
  return parkingListing.map((parkingItem) => {
    const { licencePlate, size, fuel } = parkingItem
    const fuelAdded = calculateFuelToAdd(fuel.level, fuel.capacity)
    const parkingFee = calculateParkingFee(size)
    const price = calculatePrice(parkingFee, fuelAdded)

    return {
      licencePlate,
      employee: undefined,
      fuelAdded,
      price,
    }
  })
}
