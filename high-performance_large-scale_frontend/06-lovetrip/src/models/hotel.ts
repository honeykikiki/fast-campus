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
  RecommendHotel: string[]
  forms: ReservationForm[]
}

interface BaseForm {
  id: string
  label: string
  required: string
  helpMessage?: string
}

interface TextFieldForm extends BaseForm {
  type: 'TEXT_FIELD'
}

interface SelectFieldForm extends BaseForm {
  type: 'SELECT'
  options: Array<{ label: string; value: string }>
}

export type ReservationForm = TextFieldForm | SelectFieldForm
