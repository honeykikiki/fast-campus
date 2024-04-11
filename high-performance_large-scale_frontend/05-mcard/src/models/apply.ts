import { User } from './user'

export interface Term {
  id: string
  title: string
  link?: string
}

export const APPLY_STATUS = {
  READY: 'READY',
  PROGRESS: 'PROGRESS',
  COMPLETE: 'COMPLETE',
  REJECT: 'REJECT',
} as const

export interface ApplyValues {
  userId: User['uid']
  terms: Array<Term['id']>
  applieAt: Date
  cardId: string
  salary: string
  creditScore: string
  payDate: string
  isMaster: boolean
  isHipass: boolean
  isRf: boolean
  status: keyof typeof APPLY_STATUS
}

export interface Option {
  label: string
  value: string | number | undefined
}
