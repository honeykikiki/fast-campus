import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTION } from '@/constants'
import { Review } from '@/models/review'
import { User } from '@/models/user'

export async function getReviews({ hotelId }: { hotelId: string }) {
  const hotelRef = doc(store, COLLECTION.HOTEL, hotelId)
  const reviewQuery = query(
    collection(hotelRef, COLLECTION.REVIEW),
    orderBy('createdAt', 'desc'),
  )

  const reviewSnapshot = await getDocs(reviewQuery)

  const reviews = reviewSnapshot.docs.map((doc) => {
    const review = doc.data()

    return {
      id: doc.id,
      ...review,
      createdAt: review.createdAt.toDate() as Date,
    } as Review
  })

  const userMap: {
    [key: string]: User
  } = {}

  const results: Array<Review & { user: User | undefined }> = []

  for (let review of reviews) {
    const 캐시된유저 = userMap[review.userId]

    if (캐시된유저 == null || 캐시된유저 === undefined) {
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

export function writeReview(review: Omit<Review, 'id'>) {
  const hotelRef = doc(store, COLLECTION.HOTEL, review.hotelId)
  const reviewRef = doc(collection(hotelRef, COLLECTION.REVIEW))

  return setDoc(reviewRef, review)
}

export function removeReview({
  reviewId,
  hotelId,
}: {
  reviewId: string
  hotelId: string
}) {
  const hotelRef = doc(store, COLLECTION.HOTEL, hotelId)
  const reviewRef = doc(collection(hotelRef, COLLECTION.REVIEW), reviewId)

  return deleteDoc(reviewRef)
}
