import { expect, test } from '@playwright/test'
import { ParkingLot } from '../src/parking-lot.js'
import type { Vehicle } from '../src/vehicle.js'

test.describe('Parking lot tests', () => {
  test('1. Fill only small size lots', async () => {

    ///// NOTE: This approach for testing is semi-deterministic - it is just for demo purposes

    // while loop ensures at least 1 small parking lot
    let numberOfSmallSizeLots = 0
    let parkingLot = undefined

    while (numberOfSmallSizeLots === 0) {
      parkingLot = new ParkingLot(5)
      numberOfSmallSizeLots = parkingLot.getNumberOfSpots('small', true)
    }

    console.log(`Testing with small size lots: ${numberOfSmallSizeLots}`)

    for (let i = 0; i < numberOfSmallSizeLots; i++) {
      const smallVehicle: Vehicle = {
        size: 'small',
        plateNumber: `small_${i}`,
      }

      const parkingLotId = parkingLot!.allocateSpotToVehicle(smallVehicle)
      expect(parkingLotId).toBeDefined()
    }

    // negative case
    const smallVehicle2: Vehicle = {
      size: 'small',
      plateNumber: `small_${numberOfSmallSizeLots + 1}`,
    }

    expect(() => {
      parkingLot!.allocateSpotToVehicle(smallVehicle2)
    }).toThrow()
  })
})
