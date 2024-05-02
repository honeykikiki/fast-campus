import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTION } from '@/constants'
import { Hotel } from '@/models/hotel'
import { Like } from '@/models/like'

export async function getLikes({ userId }: { userId: string }) {
  const snapShot = await getDocs(
    query(
      collection(store, COLLECTION.LIKE),
      where('userId', '==', userId),
      orderBy('order', 'asc'), // 1, 2, 3, 4
    ),
  )

  return snapShot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Like,
  )
}

export async function toggleLike({
  hotel,
  userId,
}: {
  hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'>
  userId: string
}) {
  // 이미 저장 되어있는지 판단
  const findSnapShot = await getDocs(
    query(
      collection(store, COLLECTION.LIKE),
      where('userId', '==', userId),
      where('hotelId', '==', hotel.id),
    ),
  )

  if (findSnapShot.docs.length > 0) {
    // 이미 존제 => 삭제 로직
    const removeTarget = findSnapShot.docs[0]
    const removeTargetOrder = removeTarget.data().order
    const updateTargetSnapShot = await getDocs(
      query(
        collection(store, COLLECTION.LIKE),
        where('userId', '==', userId),
        where('order', '>', removeTargetOrder),
      ),
    )

    if (updateTargetSnapShot.empty) {
      return deleteDoc(removeTarget.ref)
    } else {
      const batch = writeBatch(store)

      updateTargetSnapShot.forEach((doc) => {
        batch.update(doc.ref, { order: doc.data().order - 1 })
      })

      await batch.commit()

      return deleteDoc(removeTarget.ref)
    }
  } else {
    // 존재 하지 않음 => 추가 로직
    const lastLikedSnapShot = await getDocs(
      query(
        collection(store, COLLECTION.LIKE),
        where('userId', '==', userId),
        orderBy('order', 'desc'),
        limit(1),
      ),
    )

    const lastOrder = lastLikedSnapShot.empty
      ? 0
      : lastLikedSnapShot.docs[0].data().order

    const newLike = {
      order: lastOrder + 1,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelMainImageUrl: hotel.mainImageUrl,
      userId: userId,
    }

    return setDoc(doc(collection(store, COLLECTION.LIKE)), newLike)
  }
}

export function updateOrder(likes: Like[]) {
  const batch = writeBatch(store)

  likes.forEach((like, idx) => {
    batch.update(doc(collection(store, COLLECTION.LIKE), like.id), {
      order: like.order,
    })
  })

  return batch.commit()
}
