import { css } from '@emotion/react'
import Flex from '../shared/Flex'
import { Spacing } from '../shared/Spacing'
import MyText from '../shared/Text'
import { Room } from '@/models/room'

interface SummaryProps {
  hotelName: string
  room: Room
  startDate: string
  endDate: string
  nights: string
}

function Summary({
  hotelName,
  room,
  startDate,
  endDate,
  nights,
}: SummaryProps) {
  return (
    <div style={{ padding: 24 }}>
      <MyText typography="t4" bold={true}>
        {hotelName}
      </MyText>
      <Spacing size={8} />
      <img
        src={room.imageUrl}
        alt={`${hotelName} 호텔이미지`}
        css={imageStyles}
      />

      <Spacing size={16} />

      <div>
        <MyText bold={true}>{room.roomName}</MyText>

        <Spacing size={4} />

        <ul css={listStyles}>
          <Flex as="li" justify="space-between">
            <MyText typography="t6" color="gray600">
              일정
            </MyText>
            <MyText typography="t6">{`${startDate} - ${endDate} (${nights}박)`}</MyText>
          </Flex>

          {Object.keys(room.basicInfo).map((key) => {
            if (key in INFO_LABEL_MAP) {
              return (
                <Flex key={key} as="li" justify="space-between">
                  <MyText typography="t6" color="gray600">
                    {INFO_LABEL_MAP[key as keyof typeof INFO_LABEL_MAP]}
                  </MyText>
                  <MyText typography="t6">{room.basicInfo[key]}</MyText>
                </Flex>
              )
            }

            return null
          })}
        </ul>
      </div>
    </div>
  )
}

const INFO_LABEL_MAP = {
  bed: '침대',
  smoke: '최대인원',
  squareMeters: '면적',
  maxOccupancy: '흡연여부',
}

const imageStyles = css`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`

const listStyles = css`
  li:not(last-child) {
    margin-bottom: 8px;
  }
`

export default Summary
