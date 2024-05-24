import { parse } from 'qs'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '@/components/reservation/From'
import useReservation from '@/components/reservation/hooks/useReservation'
import Summary from '@/components/reservation/Summary'
import { Spacing } from '@/components/shared/Spacing'
import useUser from '@/hooks/auth/userUser'
import addDelimiter from '@/utils/addDelimiter'

function ReservationPage() {
  const user = useUser()
  const nav = useNavigate()
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
      [user, startDate, endDate, nights, roomId, hotelId].some((param) => {
        return param == null
      })
    ) {
      window.history.back()
    }
  }, [startDate, endDate, nights, roomId, hotelId, user])

  const { data, isLoading, makeReservation } = useReservation({
    roomId,
    hotelId,
  })

  if (data == null || isLoading === true) {
    return null
  }

  const { hotel, room } = data

  const handleSubmit = async (formValues: { [key: string]: string }) => {
    console.log(formValues)
    const newReservation = {
      userId: user?.uid as string,
      hotelId,
      roomId,
      startDate,
      endDate,
      price: room.price * Number(nights),
      formValues,
    }

    console.log(newReservation)

    await makeReservation(newReservation)
    nav(`/reservation/done?hotelName=${hotel.name}`)
  }

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
