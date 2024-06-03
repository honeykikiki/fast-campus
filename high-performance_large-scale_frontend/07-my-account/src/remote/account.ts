import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTION } from '@/constants/collection'

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
