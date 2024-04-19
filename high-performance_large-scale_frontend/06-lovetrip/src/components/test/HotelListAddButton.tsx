import { COLLECTION } from '@constants'
import { store } from '@remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import Button from '../shared/Button'
import { HOTEL_NAMES, IMAGES, EVENTS, HOTEL, ROOMS, FORMS } from '@/mock/data'

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1))
}

function HotelListAddButton() {
  const batch = writeBatch(store)

  const handleButtonClick = () => {
    try {
      const hotels = HOTEL_NAMES.map((hotelName, idx) => {
        return {
          name: hotelName,
          mainImageUrl: IMAGES[Math.floor(Math.random() * IMAGES.length)],
          Images: IMAGES,
          price: random(130000, 200000),
          starRating: random(1, 5),
          ...HOTEL,
          ...(EVENTS[idx] != null && { event: EVENTS[idx] }),
        }
      })

      hotels.forEach((hotel) => {
        const hotelDocRef = doc(collection(store, COLLECTION.HOTEL))

        // 배치에 저장
        batch.set(hotelDocRef, hotel)

        // 객실정보 저장
        ROOMS.forEach((room) => {
          const subDocRef = doc(collection(hotelDocRef, COLLECTION.ROOM))
          batch.set(subDocRef, room)
        })
      })

      batch.commit()
    } catch (error) {
      console.log(error)
    }
  }
  return <Button onClick={handleButtonClick}>호텔 목록 추가</Button>
}

export default HotelListAddButton
