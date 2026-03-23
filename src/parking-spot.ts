export type Size = 'small' | 'medium' | 'large'

export interface ParkingSpot {
  size: Size
  id: string
  isFree: boolean
}
