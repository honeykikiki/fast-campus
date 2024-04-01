import classnames from 'classnames/bind'
import React from 'react'
import Dimmed from './Dimmed'

import styles from './Modal.module.scss'

const cx = classnames.bind(styles)

interface ModalProps {
  open: boolean
  title?: string
  body: React.ReactNode
  rightButtonLabel?: string
  onRightButtonClick: () => void
  LeftButtonLabel?: string
  onLeftButtonClick: () => void
}

export default function Modal({
  open,
  title,
  body,
  rightButtonLabel = '확인',
  onRightButtonClick,
  LeftButtonLabel = '닫기',
  onLeftButtonClick,
}: ModalProps) {
  if (open === false) {
    return null
  }

  return (
    <Dimmed>
      <div className={cx('wrap-modal')}>
        <div className={cx('wrap-body')}>
          <div className={cx('wrap-content')}>
            {title == null ? null : (
              <div className={cx('txt-title')}>{title}</div>
            )}
            {body}
          </div>
          <div className={cx('wrap-buttons')}>
            <button type="button" onClick={onRightButtonClick}>
              {LeftButtonLabel}
            </button>
            <button type="button" onClick={onLeftButtonClick}>
              {rightButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </Dimmed>
  )
}
