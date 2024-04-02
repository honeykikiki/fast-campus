import AttendCountModal from '@components/AttendCountModal'
import Calendar from '@components/sections/Calendar'
import Contact from '@components/sections/contact'
import Heading from '@components/sections/Heading'
import ImageGallery from '@components/sections/ImageGallery'
import Intro from '@components/sections/Intro'
import Invitation from '@components/sections/Invitation'
import Map from '@components/sections/Map'
import Share from '@components/sections/Share'
import Video from '@components/sections/Video'
import FullScreenMessage from '@shared/FullScreenMessage'
import classNames from 'classnames/bind'
import styles from './App.module.scss'
import useWedding from './hooks/useWedding'

const cx = classNames.bind(styles)

function App() {
  // 1. 웨딩 데이터 호출 (빈 배열은 한번만 호출)
  const { wedding, error } = useWedding()

  if (wedding == null) {
    return null
  }

  const {
    date,
    galleryImages,
    groom,
    bride,
    location,
    message: { intro, invitation },
  } = wedding

  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        locationName={location.name}
        date={date}
        message={intro}
      />
      <Invitation message={invitation} />
      <ImageGallery images={galleryImages} />
      <Calendar date={date} />
      <Map location={location} />
      <Contact groom={groom} bride={bride} />
      <Share groomName={groom.name} brideName={bride.name} date={date} />
      <AttendCountModal wedding={wedding} />
    </div>
  )
}

export default App
