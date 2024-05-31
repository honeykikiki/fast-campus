import { collection, doc, getDoc } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTION } from '@/constants/collection'
import { Event } from '@/models/event'

export async function getEvent(id: string) {
  const snapshot = await getDoc(doc(collection(store, COLLECTION.EVENT), id))

  return {
    id: snapshot.id,
    ...(snapshot.data() as Event),
  }
}
