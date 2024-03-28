import classNames from 'classnames/bind'
import styles from './Section.module.scss'

const cx = classNames.bind(styles)

export default function Section({
  children,
  classNames,
  title,
}: {
  children: React.ReactNode
  classNames?: string
  title?: string
}) {
  return (
    <section className={cx(['container', classNames])}>
      {title != null ? <div className={cx('txt-title')}>{title}</div> : null}
      {children}
    </section>
  )
}
