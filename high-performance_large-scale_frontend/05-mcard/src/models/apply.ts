import { User } from './user'

export interface Term {
  id: string
  title: string
  link?: string
}

export interface ApplyValues {
  userId: User['uid']
  terms: Array<Term['id']>
  applieAt: Date
  cardId: string
  salary: string
  creditScore: string
  payDate: string
}

export interface Option {
  label: string
  value: string | number | undefined
}
