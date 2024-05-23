import { useQuery } from 'react-query'
import { useAlertContext } from '@/context/AlertContext'
import { getHotelWithRoom } from '@/remote/hotel'

function useReservation({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) {
  const { open } = useAlertContext()
  const { data, isLoading } = useQuery(
    ['hotelWithRoom', hotelId, roomId],
    () => getHotelWithRoom({ hotelId, roomId }),
    {
      onSuccess: ({ room }) => {
        if (room.avaliableCount === 0) {
          open({
            title: '객실이 매진 되었습니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
        }
      },
    },
  )

  return { data, isLoading }
}

export default useReservation
