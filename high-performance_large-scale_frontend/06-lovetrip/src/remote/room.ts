import { collection, doc, getDocs } from 'firebase/firestore'

import { store } from './firebase'
import { COLLECTION } from '@/constants'
import { Room } from '@/models/room'

export async function getRooms(hotelId: string) {
  const snapShot = await getDocs(
    collection(doc(store, COLLECTION.HOTEL, hotelId), COLLECTION.ROOM),
  )

  return snapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Room),
  }))
}
