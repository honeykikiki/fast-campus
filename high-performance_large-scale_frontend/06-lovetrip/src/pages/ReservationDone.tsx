import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import { Spacing } from '@/components/shared/Spacing'
import MyText from '@/components/shared/Text'

function ReservationDonePage() {
  const nav = useNavigate()
  const { hotelName } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    hotelName?: string
  }

  return (
    <div>
      <Spacing size={8} />
      <Flex direction="column" align="center">
        <img
          width={120}
          height={120}
          src="https://cdn3.iconfinder.com/data/icons/basic-user-interface-5/64/plane_fly_airport_traveling_trip_connection-1024.png"
          alt="비행기이미지"
        />
        <Spacing size={30} />
        <MyText typography="t4" bold={true}>
          {hotelName}
        </MyText>
        <Spacing size={8} />
        <MyText>예약이 완료되었습니다.</MyText>
      </Flex>
      <Spacing size={40} />
      <div style={{ padding: 24 }}>
        <Button.Group>
          <Button onClick={() => nav('/')}>홈으로</Button>
          <Button onClick={() => nav('/reservation/list')}>
            예약 리스트로
          </Button>
        </Button.Group>
      </div>
    </div>
  )
}

export default ReservationDonePage
