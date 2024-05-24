import { collection, getDocs, writeBatch } from 'firebase/firestore'
import Button from '../shared/Button'
import { COLLECTION } from '@/constants'
import { FORMS } from '@/mock/data'
import { store } from '@/remote/firebase'

function HotelFormAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    const snapshot = await getDocs(collection(store, COLLECTION.HOTEL))

    snapshot.docs.forEach((hotel) => {
      batch.update(hotel.ref, {
        forms: FORMS,
      })
    })

    await batch.commit()

    alert('데이터 추가 완료')
  }

  return (
    <div>
      <Button onClick={handleButtonClick}>폼 데이터</Button>
    </div>
  )
}

export default HotelFormAddButton
