import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTION } from '@/constants'
import { Review } from '@/models/review'
import { User } from '@/models/user'

export async function getReview({ hotelId }: { hotelId: string }) {
  const hotelRef = doc(store, COLLECTION.HOTEL, hotelId)

  const reviewQuery = query(
    collection(hotelRef, COLLECTION.REVIEW),
    orderBy('createdAt', 'desc'),
  )

  const reviewSnapShat = await getDocs(reviewQuery)

  const reviews = reviewSnapShat.docs.map((doc) => {
    const review = doc.data()

    return {
      id: doc.id,
      ...review,
      createdAt: review.createdAt.toDate() as Date,
    } as Review
  })

  // 1. 리뷰가 3개 인 경우
  const userMap: {
    [key: string]: User
  } = {}

  const results: Array<Review & { user: User }> = []

  for (let review of reviews) {
    const 캐시된유저 = userMap[review.userId]

    if (캐시된유저 == null) {
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTION.USER), review.userId),
      )

      const user = userSnapshot.data() as User

      userMap[review.userId] = user
      results.push({
        ...review,
        user,
      })
    } else {
      results.push({
        ...review,
        user: 캐시된유저,
      })
    }
  }

  return results
}
