import { collection, doc, getDoc } from 'firebase/firestore'

import { COLLECTION } from '@/constants/collection'
import { Event } from '@/models/event'

import { store } from './firebase'

export async function getEvent(id: string) {
  const snapshot = await getDoc(doc(collection(store, COLLECTION.EVENT), id))

  return {
    id: snapshot.id,
    ...(snapshot.data() as Event),
  }
}
