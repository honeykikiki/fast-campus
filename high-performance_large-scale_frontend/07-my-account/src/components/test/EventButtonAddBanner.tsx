import { collection, doc, writeBatch } from 'firebase/firestore'

import { COLLECTION } from '@/constants/collection'
import { EVENT_BANNERS } from '@/mock/banner'
import { store } from '@/remote/firebase'

import Button from '../shared/Button'

function EventButtonAddBanner() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    EVENT_BANNERS.forEach((banner) => {
      const bannerRef = doc(collection(store, COLLECTION.EVENT_BANNER))

      batch.set(bannerRef, banner)
    })

    await batch.commit()

    window.alert('데이터 추가 완료~')
  }

  return <Button onClick={handleButtonClick}>이벤트 베너데이터 추가</Button>
}

export default EventButtonAddBanner
