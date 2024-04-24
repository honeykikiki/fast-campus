import { css } from '@emotion/react'
import { useState } from 'react'
import Button from '../shared/Button'
import ListRow from '../shared/ListRows'
import { Spacing } from '../shared/Spacing'
import MyText from '../shared/Text'
import useRecommendHotels from './hooks/useRecommend'
import addDelimiter from '@/utils/addDelimiter'

function RecommendHotels({ hotelIds }: { hotelIds: string[] }) {
  const [showMore, setShowMore] = useState(false)
  const { data, isLoading } = useRecommendHotels({ hotelIds })

  if (data == null || isLoading) {
    return null
  }

  const hotelList = data.length < 3 || showMore ? data : data.slice(0, 3)

  return (
    <div style={{ margin: '24px 0' }}>
      <MyText typography="t4" bold={true} style={{ padding: '0 24px' }}>
        추천 호텔
      </MyText>
      <Spacing size={16} />
      <ul>
        {hotelList.map((hotel) => (
          <ListRow
            key={hotel.id}
            left={
              <img
                src={hotel.mainImageUrl}
                alt={`${hotel.name} 호텔 이미지`}
                css={imageStyles}
              />
            }
            contents={
              <ListRow.Texts
                title={hotel.name}
                subTitle={`${addDelimiter(hotel.price)}원`}
              />
            }
          />
        ))}
      </ul>
      {data.length > 3 && showMore === false ? (
        <div style={{ padding: '0 24px', marginTop: '12px' }}>
          <Button onClick={() => setShowMore(true)} full={true} weak={true}>
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  )
}

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

export default RecommendHotels
