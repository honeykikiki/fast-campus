import Flex from '@shared/Flex'
import ListRow from '@shared/ListRows'
import { Spacing } from '@shared/Spacing'
import Tag from '@shared/Tag'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Hotel as IHotel } from '@/models/hotel'
import addDelimiter from '@/utils/addDelimiter'
import formatTime from '@/utils/formatTime'

function Hotel({ hotel }: { hotel: IHotel }) {
  const [remainedTime, setRemainedTime] = useState(0)
  useEffect(() => {
    if (hotel.event == null || hotel.event.promoEndTime == null) {
      return
    }

    const promoEndTime = hotel.event.promoEndTime

    const timer = setInterval(() => {
      const 남은초 = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date(),
      )

      if (남은초 < 0) {
        clearInterval(timer)
      }

      setRemainedTime(남은초)
    }, 1_000)

    return () => {
      if (timer == null) {
        return
      }

      clearInterval(timer)
    }
  }, [hotel.event])

  const tagComponent = () => {
    if (hotel.event == null) {
      return null
    }
    const { name, tagThemeStyle } = hotel.event

    const promotionText =
      remainedTime > 0 ? ` ${formatTime(remainedTime)} 남음` : ' 시간 확인중...'

    return (
      <div>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionText)}
        </Tag>
        <Spacing size={8} />
      </div>
    )
  }

  return (
    <div>
      <Link to={`/hotel/${hotel.id}`}>
        <ListRow
          style={containerStyles}
          contents={
            <Flex direction="column">
              {tagComponent()}
              <ListRow.Texts title={hotel.name} subTitle={hotel.comment} />
              <Spacing size={4} />
              <Text typography="t7" color="gray600">
                {hotel.starRating} 성급
              </Text>
            </Flex>
          }
          right={
            <Flex direction="column" align="flex-end">
              <img src={hotel.mainImageUrl} alt="" css={imageStyles} />
              <Spacing size={8} />
              <Text bold={true}>{addDelimiter(hotel.price)}원</Text>
            </Flex>
          }
        />
      </Link>
    </div>
  )
}

const containerStyles = css`
  align-items: flex-start;
`

const imageStyles = css`
  width: 90px;
  height: 110px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 16px;
`

export default Hotel
