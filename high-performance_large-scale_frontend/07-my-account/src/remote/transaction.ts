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

import { COLLECTION } from '@/constants/collection'
import { Transaction, TransactionFilterType } from '@/models/transaction'

import { store } from './firebase'

export async function createTransaction(newTransaction: Transaction) {
  return setDoc(doc(collection(store, COLLECTION.TRANSACTION)), newTransaction)
}

export async function getTransactions({
  pageParam,
  userId,
  filter = 'all',
}: {
  pageParam?: QuerySnapshot<Transaction>
  userId: string
  filter?: TransactionFilterType
}) {
  const transactionQuery = generateQuery({ pageParam, userId, filter })

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

function generateQuery({
  filter,
  pageParam,
  userId,
}: {
  pageParam?: QuerySnapshot<Transaction>
  userId: string
  filter?: TransactionFilterType
}) {
  const baseQuery = query(
    collection(store, COLLECTION.TRANSACTION),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(15),
  )

  if (filter !== 'all') {
    if (pageParam == null) {
      return query(baseQuery, where('type', '==', filter))
    }

    return query(baseQuery, startAfter(pageParam), where('type', '==', filter))
  } else {
    if (pageParam == null) {
      return baseQuery
    }

    return query(baseQuery, startAfter(pageParam))
  }
}
