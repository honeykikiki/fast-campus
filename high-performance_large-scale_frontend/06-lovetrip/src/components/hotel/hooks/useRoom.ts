import { collection, doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { COLLECTION } from '@/constants'
import { Room } from '@/models/room'
import { store } from '@/remote/firebase'
import { getRooms } from '@/remote/room'

function useRooms({ hotelId }: { hotelId: string }) {
  const client = useQueryClient()
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(doc(store, COLLECTION.HOTEL, hotelId), COLLECTION.ROOM),
      (snapShot) => {
        const newRooms = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Room),
        }))

        client.setQueriesData(['rooms', hotelId], newRooms)
      },
    )

    return () => {
      unsubscribe()
    }
  }, [client, hotelId])

  return useQuery(['rooms', hotelId], () => getRooms(hotelId), {
    suspense: true,
  })
}

export default useRooms
