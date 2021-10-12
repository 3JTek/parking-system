import { IParkingItem } from "../index"

export default function validateParkingListingInput(parkingListingInput: IParkingItem[]): void {
  const error: string[] = []

  parkingListingInput.forEach((item) => {
    if (typeof item.licencePlate !== "string") {
      error.push("Licence should be a string")
    }

    if (!["large", "small"].includes(item.size)) {
      error.push("Size should be small or large")
    }

    if (!item.fuel) {
      error.push("Fuel object is missing")
    } else {
      if (typeof item.fuel.capacity !== "number" || item.fuel?.capacity < 0) {
        error.push("Capacity should be a positive number")
      }

      if (item.fuel.level < 0 || item.fuel.level > 1) {
        error.push("Level should be between 0 and 1")
      }
    }
  })

  if (error.length > 0) throw new Error(error.join(", "))
}
