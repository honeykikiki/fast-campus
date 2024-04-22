export interface Hotel {
  comment: string
  contents: string
  id: string
  location: {
    directions: string
    pointGeolocation: {
      x: number
      y: number
    }
  }
  Images: string[]
  mainImageUrl: string
  name: string
  price: number
  starRating: number
  event?: {
    name: string
    promoEndTime?: string
    tagThemeStyle: {
      backgroundColor: string
      fontColor: string
    }
  }
}
