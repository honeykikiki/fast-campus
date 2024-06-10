import { collection, doc, getDocs, query, where } from 'firebase/firestore'

import { store } from './firebase'
import { COLLECTION } from '@/constants/collection'
import { EventBanner } from '@/models/banner'

export async function getEventBanners({ hasAccount }: { hasAccount: boolean }) {
  const eventBannerQuery = query(
    collection(store, COLLECTION.EVENT_BANNER),
    where('hasAccount', '==', hasAccount),
  )

  const snapShot = await getDocs(eventBannerQuery)
  return snapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as EventBanner),
  }))
}
