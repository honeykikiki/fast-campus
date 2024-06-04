import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { store } from './firebase'
import { COLLECTION } from '@/constants/collection'
import { Account } from '@/models/account'

export function setTerms({
  userId,
  termIds,
}: {
  userId: string
  termIds: string[]
}) {
  return setDoc(doc(collection(store, COLLECTION.TERMS), userId), {
    userId,
    termIds,
  })
}

export async function getTerm(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTION.TERMS), userId),
  )

  if (snapshot.exists() === false) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as { userId: string; termIds: string[] }),
  }
}

export async function createAccount(newAccount: Account) {
  return setDoc(
    doc(collection(store, COLLECTION.ACCOUNT), newAccount.userId),
    newAccount,
  )
}

export async function getAccount(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTION.ACCOUNT), userId),
  )

  if (snapshot.exists() === false) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Account),
  }
}

export function updateAccountBalance(userId: string, balance: number) {
  const snapShot = doc(collection(store, COLLECTION.ACCOUNT), userId)

  return updateDoc(snapShot, { balance })
}
