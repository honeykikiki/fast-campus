import Section from '@shared/Section'
import classNames from 'classnames/bind'
import { format, parseISO, getDay } from 'date-fns'
import styles from './Heading.module.scss'

const cx = classNames.bind(styles)

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export default function Heading({ date }: { date: string }) {
  const weddingDate = parseISO(date)

  return (
    <Section classNames={cx('container')}>
      <div className={cx('txt-date')}>{format(weddingDate, 'yyyy.MM.dd.')}</div>
      <div className={cx('txt-day')}>{DAYS[getDay(weddingDate)]}</div>
    </Section>
  )
}
