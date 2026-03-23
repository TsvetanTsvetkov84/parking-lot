import type { ParkingSpot, Size } from './parking-spot.js'
import type { Vehicle } from './vehicle.js'

export class ParkingLot {
  private readonly spots: ParkingSpot[] = []

  constructor(lotSize: number) {
    for (let i = 0; i < lotSize; i++) {
      const randomNum = Math.random()

      let size: Size = 'large'

      if (randomNum < 1 / 3) {
        size = 'small'
      } else if (randomNum < 2 / 3) {
        size = 'medium'
      }

      this.spots.push({ id: `${i}`, size: size, isFree: true })
    }
  }

  /**
   *
   * The function that allocates a free parking spot based on the vehicle size coming to park.
   * @param vehicle - object representing the vehicle entering the parking lot.
   * @returns ID of the free spot allocated by the parking lot system.
   */
  allocateSpotToVehicle(vehicle: Vehicle): string {
    console.log(`Allocating spot for size: ${vehicle.size}`)

    const freeSpot = this.spots.find((spot) => spot.size === vehicle.size && spot.isFree)
    if (freeSpot) {
      freeSpot.isFree = false

      console.log(`Successfully allocated spot ${freeSpot.id} for size: ${vehicle.size}`)

      return freeSpot.id
    }

    throw new Error(`There is no free spot for size: ${vehicle.size}`)
  }

  getNumberOfSpots(size: Size, isFree: boolean = true): number {
    const spots = this.spots.filter((spot) => spot.size === size && spot.isFree === isFree)
    return spots.length
  }
}
