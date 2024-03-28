import Section from '@shared/Section'
import classnames from 'classnames/bind'
import styles from './ImageGallery.module.scss'
import ImageViewer from '../imageViewer'
import { useState } from 'react'

const cx = classnames.bind(styles)

export default function ImageGallery({ images }: { images: string[] }) {
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const open = selectedIdx !== -1

  const handleSelectedImages = (idx: number) => {
    setSelectedIdx(idx)
  }

  const handleClose = () => {
    setSelectedIdx(-1)
  }

  return (
    <>
      <Section classNames={cx('container')} title="사진첩">
        <ul className={cx('wrap-images')}>
          {images.map((src, idx) => (
            <li
              key={idx}
              className={cx('wrap-image')}
              onClick={() => handleSelectedImages(idx)}
            >
              <img src={src} alt="사진첩 이미지" />
            </li>
          ))}
        </ul>
      </Section>
      <ImageViewer
        images={images}
        open={open}
        selectedIdx={selectedIdx}
        onClose={handleClose}
      />
    </>
  )
}
