import classnames from 'classnames/bind'
import React from 'react'

import styles from './Dimmed.module.scss'

const cx = classnames.bind(styles)

export default function Dimmed({
  children,
  onClose,
}: {
  children: React.ReactNode
  onClose?: () => void
}) {
  return (
    <div className={cx('dimmed')} onClick={onClose}>
      {children}
    </div>
  )
}
