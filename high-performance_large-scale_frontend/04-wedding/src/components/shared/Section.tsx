import classNames from 'classnames/bind'
import styles from './Section.module.scss'

const cx = classNames.bind(styles)

export default function Section({
  children,
  classNames,
}: {
  children: React.ReactNode
  classNames?: string
}) {
  return <section className={cx(['container', classNames])}>{children}</section>
}
