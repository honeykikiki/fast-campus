import { Swiper, SwiperSlide } from 'swiper/react'

import classnames from 'classnames/bind'

import 'swiper/css'
import styles from './ImageViewer.module.scss'
import './swiper.css'
import Dimmed from '../shared/Dimmed'
import generateImageUrl from '@/utils/generateImageUrl'

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
    <Dimmed onClose={onClose}>
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
              <picture>
                <source
                  srcSet={generateImageUrl({
                    filename: src,
                    format: 'webp',
                    // option: 'w_1080,h_1080,q_auto,c_fill',
                  })}
                  type="image/webp"
                />
                <img
                  src={generateImageUrl({
                    filename: src,
                    format: 'jpg',
                    // // option: 'w_1080,h_1080,q_auto,c_fill',
                  })}
                  alt="사진첩 이미지"
                />
              </picture>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Dimmed>
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
