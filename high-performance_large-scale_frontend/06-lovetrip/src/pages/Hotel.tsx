import { css } from '@emotion/react'
import { useParams } from 'react-router-dom'
import ActionButtons from '@/components/hotel/ActionButtons'
import Carousel from '@/components/hotel/Carousel'
import Contents from '@/components/hotel/Contents'
import useHotel from '@/components/hotel/hooks/useHotel'
import RecommendHotels from '@/components/hotel/RecommendHotels'
import Review from '@/components/hotel/Review'
import Rooms from '@/components/hotel/Rooms'
import ScrollProgressBar from '@/components/shared/ScrollProgressBar'
import SEO from '@/components/shared/SEO'
import Top from '@/components/shared/Top'

function HotelPage() {
  const { id } = useParams() as { id: string }
  const { isLoading, data } = useHotel({ id })

  if (data == null || isLoading) {
    return <div>Loading...</div>
  }

  const { name, comment, Images, contents, RecommendHotel } = data

  return (
    <div>
      <SEO title={name} description={comment} image={Images[0]} />
      <ScrollProgressBar style={scrollProgressBarStyles} />
      <Top title={name} subTitle={comment} />
      <Carousel images={Images} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
      <ActionButtons hotel={data} />
      <RecommendHotels hotelIds={RecommendHotel} />
      <Review hotelId={id} />
    </div>
  )
}

const scrollProgressBarStyles = css`
  position: sticky;
  top: 64px;
  z-index: 2;
`

export default HotelPage
