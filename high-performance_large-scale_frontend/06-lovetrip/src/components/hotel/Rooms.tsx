import Flex from '@shared/Flex'
import ListRow from '@shared/ListRows'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Button from '../shared/Button'
import { Spacing } from '../shared/Spacing'
import Tag from '../shared/Tag'
import useRooms from './hooks/useRoom'
import addDelimiter from '@/utils/addDelimiter'

function Rooms({ hotelId }: { hotelId: string }) {
  const { data } = useRooms({ hotelId })

  return (
    <Container>
      <Header justify="space-between">
        <Text typography="t4" bold={true}>
          객실정보
        </Text>
        <Text typography="t6" color="gray400">
          1박, 세금 포함
        </Text>
      </Header>

      <ul>
        {data?.map((room) => {
          const 마감인박인가 = room.avaliableCount === 1
          const 매진인가 = room.avaliableCount === 0

          return (
            <ListRow
              key={room.id}
              left={
                <img
                  src={room.imageUrl}
                  alt={`${room.roomName} 객식 이미지`}
                  css={imageStyles}
                />
              }
              contents={
                <ListRow.Texts
                  title={
                    <Flex>
                      <Text>{room.roomName}</Text>
                      <Spacing size={6} direction="horizontal" />
                      {마감인박인가 === true ? (
                        <Tag type="sm" backgroundColor="red">
                          마감임박
                        </Tag>
                      ) : null}
                    </Flex>
                  }
                  subTitle={`${addDelimiter(room.price)}원 / `.concat(
                    room.refundable ? '환불 가능' : '환불 불가',
                  )}
                />
              }
              right={
                <Button size="medium" disabled={매진인가}>
                  {매진인가 === true ? '매진' : '선택'}
                </Button>
              }
            ></ListRow>
          )
        })}
      </ul>
    </Container>
  )
}

const Container = styled.div`
  margin: 40px 0;
`

const Header = styled(Flex)`
  padding: 0 24px;
  margin-bottom: 20px;
`

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

export default Rooms
