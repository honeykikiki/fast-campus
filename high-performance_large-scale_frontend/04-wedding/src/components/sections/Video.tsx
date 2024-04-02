import Section from '@shared/Section'
import classNames from 'classnames/bind'
import styles from './Video.module.scss'

const cx = classNames.bind(styles)

export default function Video() {
  return (
    <Section classNames={cx('container')}>
      <video
        autoPlay={true}
        muted={true}
        loop={true}
        poster="/assets/poster.jpg"
      >
        <source src="/assets/main.webm" type="video/webm" />
        <source src="/assets/main.mp4" type="video/mp4" />
      </video>
    </Section>
  )
}
