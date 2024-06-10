import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTION } from '@/constants/collection'
import { Credit } from '@/models/credit'

export function updateCredit({
  userId,
  creditScore,
}: {
  userId: string
  creditScore: number
}) {
  return setDoc(doc(collection(store, COLLECTION.CREDIT), userId), {
    userId,
    creditScore,
  })
}

export async function getCredit(userId: string) {
  const snapShot = await getDoc(
    doc(collection(store, COLLECTION.CREDIT), userId),
  )
  if (snapShot.exists() === false) {
    return null
  }

  return {
    id: snapShot.id,
    ...(snapShot.data() as Credit),
  }
}
