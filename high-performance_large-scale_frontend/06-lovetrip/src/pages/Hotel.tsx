import { useParams } from 'react-router-dom'
import Carousel from '@/components/hotel/Carousel'
import Contents from '@/components/hotel/Contents'
import useHotel from '@/components/hotel/hooks/useHotel'
import Rooms from '@/components/hotel/Rooms'
import Top from '@/components/shared/Top'

function HotelPage() {
  const { id } = useParams() as { id: string }
  const { isLoading, data } = useHotel({ id })

  if (data == null || isLoading) {
    return <div>Loading...</div>
  }

  const { name, comment, Images, contents } = data

  return (
    <div>
      <Top title={name} subTitle={comment} />
      <Carousel images={Images} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
    </div>
  )
}

export default HotelPage
