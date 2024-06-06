import {
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from 'firebase/firestore'

import { COLLECTION } from '@/constants/collection'
import { Card } from '@/models/card'

import { store } from './firebase'

export async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTION.CARD), limit(15))
      : query(
          collection(store, COLLECTION.CARD),
          startAfter(pageParam),
          limit(15),
        )

  const cardSnapshot = await getDocs(cardQuery)
  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

export async function getSearchCards(keyword: string) {
  const searchQuery = query(
    collection(store, COLLECTION.CARD),
    where('name', '>=', keyword),
    where('name', '<=', keyword + '\uf8ff'),
  )

  const cardSnapshot = await getDocs(searchQuery)
  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}

export async function getCard(id: string) {
  const cardSnapshot = await getDoc(doc(collection(store, COLLECTION.CARD), id))

  return {
    id: cardSnapshot.id,
    ...(cardSnapshot.data() as Card),
  }
}
