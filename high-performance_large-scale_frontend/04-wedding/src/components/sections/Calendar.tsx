import classNames from 'classnames/bind'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import Section from '../shared/Section'
import styles from './Calendar.module.scss'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

const cx = classNames.bind(styles)
const css = `
  .rdp-caption {
    display: none;
  }

  .rdp-cell {
    cursor: default;
  }

  .rdp-head_cell {
    font-weight: 500;
    font-size: 24px;
    font-weight: bold;
  }

  .rdp-day_selected {
    background-color: var(--red);
    font-weight: bold;
    color: #fff;
  }

  .rdp-day_selected:hover {
    background-color: var(--red);
  }
`

export default function Calendar({ date }: { date: string }) {
  const weddingDate = parseISO(date)

  return (
    <Section
      classNames={cx('container')}
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-time')}>
            {format(weddingDate, 'yyyy.MM.dd.')}
          </span>
          <span className={cx('txt-date')}>
            {format(weddingDate, 'a h시 eeee', { locale: ko })}
          </span>
        </div>
      }
    >
      <div>
        <style>{css}</style>
        <DayPicker
          locale={ko}
          month={weddingDate}
          selected={weddingDate}
          formatters={{ formatCaption: () => '' }}
        />
      </div>
    </Section>
  )
}
