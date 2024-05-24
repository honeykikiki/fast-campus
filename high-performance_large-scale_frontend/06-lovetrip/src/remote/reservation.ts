import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { store } from './firebase'
import { getHotel } from './hotel'
import { COLLECTION } from '@/constants'
import { Reservation } from '@/models/reservation'
import { Room } from '@/models/room'

export async function makeReservation(newReservation: Reservation) {
  const { hotelId, roomId } = newReservation
  const hotelSnapshot = doc(store, COLLECTION.HOTEL, hotelId)
  const roomSnapshot = await getDoc(doc(hotelSnapshot, COLLECTION.ROOM, roomId))

  const room = roomSnapshot.data() as Room
  const nowAvailableCount = room.availableCount

  if (nowAvailableCount === 0) {
    throw new Error('잔여 객식이 없음')
  }

  return Promise.all([
    updateDoc(roomSnapshot.ref, { availableCount: nowAvailableCount - 1 }),
    setDoc(doc(collection(store, COLLECTION.RESERVATION)), newReservation),
  ])
}

export async function getReservationList({ userId }: { userId: string }) {
  const reservationQuery = query(
    collection(store, COLLECTION.RESERVATION),
    where('userId', '==', userId),
  )

  const reservationSnapshot = await getDocs(reservationQuery)

  const result = []
  for (const reservationDoc of reservationSnapshot.docs) {
    const reservation = {
      id: reservationDoc.id,
      ...(reservationDoc.data() as Reservation),
    }

    const hotel = await getHotel(reservation.hotelId)

    result.push({
      reservation,
      hotel,
    })
  }

  return result
}
