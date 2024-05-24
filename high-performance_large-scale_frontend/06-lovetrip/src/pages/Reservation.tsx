import { parse } from 'qs'
import { useEffect } from 'react'
import Form from '@/components/reservation/From'
import useReservation from '@/components/reservation/hooks/useReservation'
import Summary from '@/components/reservation/Summary'
import { Spacing } from '@/components/shared/Spacing'
import addDelimiter from '@/utils/addDelimiter'

function ReservationPage() {
  const { startDate, endDate, nights, roomId, hotelId } = parse(
    window.location.search,
    {
      ignoreQueryPrefix: true,
    },
  ) as {
    startDate: string
    endDate: string
    nights: string
    roomId: string
    hotelId: string
  }

  useEffect(() => {
    if (
      [startDate, endDate, nights, roomId, hotelId].some((param) => {
        return param == null
      })
    ) {
      window.history.back()
    }
  }, [startDate, endDate, nights, roomId, hotelId])

  const { data, isLoading } = useReservation({ roomId, hotelId })

  if (data == null || isLoading === true) {
    return null
  }

  const { hotel, room } = data

  const handleSubmit = () => {}

  const buttonLabel = `${nights}박 ${addDelimiter(room.price * Number(nights))}원 예약하기`

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={8} backgroundColor="gray100" />
      <Form
        forms={hotel.forms}
        onSubmit={handleSubmit}
        buttonLabel={buttonLabel}
      />
    </div>
  )
}

export default ReservationPage
