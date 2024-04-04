import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { addBanners } from '@/mock/data'
import { store } from '@/remote/firebase'

function AsBannerListButton() {
  // store
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    addBanners.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER))
      batch.set(docRef, card)
    })

    try {
      await batch.commit()
      alert('배너 리스트 추가완료')
    } catch (e) {
      console.log(e)
    }
  }

  return <Button onClick={handleButtonClick}>배너 리스트 추가하기</Button>
}

export default AsBannerListButton
