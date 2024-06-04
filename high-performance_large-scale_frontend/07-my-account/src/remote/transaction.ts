import {
  QuerySnapshot,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTION } from '@/constants/collection'
import { Transaction } from '@/models/transaction'

export async function createTransaction(newTransaction: Transaction) {
  return setDoc(doc(collection(store, COLLECTION.TRANSACTION)), newTransaction)
}

export async function getTransactions({
  pageParam,
  userId,
}: {
  pageParam?: QuerySnapshot<Transaction>
  userId: string
}) {
  const transactionQuery =
    pageParam == null
      ? query(
          collection(store, COLLECTION.TRANSACTION),
          where('userId', '==', userId),
          orderBy('date', 'desc'),
          limit(15),
        )
      : query(
          collection(store, COLLECTION.TRANSACTION),
          where('userId', '==', userId),
          orderBy('date', 'desc'),
          startAfter(pageParam),
          limit(15),
        )

  const transactionSnapshot = await getDocs(transactionQuery)
  const lastVisible =
    transactionSnapshot.docs[transactionSnapshot.docs.length - 1]
  const items = transactionSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Transaction),
  }))

  return {
    items,
    lastVisible,
  }
}
