export interface Room {
  availableCount: number
  basicInfo: {
    [key: string]: string | number
  }
  bed: string
  maxOccupancy: number
  smoke: string
  squareMeters: string
  imageUrl: string
  price: number
  refundable: boolean
  roomName: string
}