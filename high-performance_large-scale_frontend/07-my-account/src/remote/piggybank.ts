import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

import { store } from './firebase'
import { COLLECTION } from '@/constants/collection'
import { Piggybank } from '@/models/piggybank'

export async function createPiggybank(newPiggybank: Piggybank) {
  return setDoc(doc(collection(store, COLLECTION.PIGGYBANK)), newPiggybank)
}

export async function getPiggybank(userId: string) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTION.PIGGYBANK),
      where('userId', '==', userId),
      where('endDate', '>=', new Date()),
      orderBy('endDate', 'asc'),
      limit(1),
    ),
  )

  if (snapshot.docs.length === 0) {
    return null
  }

  const piggyBank = snapshot.docs[0].data()

  return {
    id: snapshot.docs[0].id,
    ...(piggyBank as Piggybank),
    startDate: piggyBank.startDate.toDate(),
    endDate: piggyBank.endDate.toDate(),
  }
}
