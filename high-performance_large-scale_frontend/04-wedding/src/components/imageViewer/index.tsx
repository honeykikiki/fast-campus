import { Swiper, SwiperSlide } from 'swiper/react'

import classnames from 'classnames/bind'

import 'swiper/css'
import styles from './ImageViewer.module.scss'
import './swiper.css'

const cx = classnames.bind(styles)

export default function ImageViewer({
  images,
  open = false,
  selectedIdx,
  onClose,
}: {
  images: string[]
  open: boolean
  selectedIdx: number
  onClose: () => void
}) {
  if (open === false) {
    return null
  }

  return (
    <div className={cx('dimmed')}>
      <CloseButton className={cx('icon-close')} onClose={onClose} />
      <Swiper
        spaceBetween={40}
        slidesPerView={1}
        loop={true}
        initialSlide={selectedIdx}
      >
        {images.map((src, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={src} alt="슬라이드 이미지" />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

function CloseButton({
  onClose,
  className,
}: {
  onClose: () => void
  className: string
}) {
  return (
    <svg
      version="1.1"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClose}
      className={className}
    >
      <style type="text/css"></style>
      <g>
        <g>
          <line x1="7.6" x2="22" y1="12" y2="12" />
        </g>
        <g>
          <path d="M11.9,0.8H4.5C3.1,0.8,2,1.9,2,3.2v17.5c0,1.4,1.1,2.5,2.5,2.5h7.4" />
        </g>
        <polyline points="18.2,8.2 22,12 18.2,15.8  " />
      </g>
    </svg>
  )
}
