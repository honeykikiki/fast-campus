import Flex from '@shared/Flex'
import ListRow from '@shared/ListRows'
import MyText from '@shared/Text'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import Button from '../shared/Button'
import { Spacing } from '../shared/Spacing'
import Tag from '../shared/Tag'
import useRooms from './hooks/useRoom'
import { useAlertContext } from '@/context/AlertContext'
import useUser from '@/hooks/auth/userUser'
import addDelimiter from '@/utils/addDelimiter'

function Rooms({ hotelId }: { hotelId: string }) {
  const { data } = useRooms({ hotelId })
  const user = useUser()
  const { open } = useAlertContext()
  const nav = useNavigate()

  return (
    <Container>
      <Header justify="space-between">
        <MyText typography="t4" bold={true}>
          객실정보
        </MyText>
        <MyText typography="t6" color="gray400">
          1박, 세금 포함
        </MyText>
      </Header>

      <ul>
        {data?.map((room) => {
          const 마감인박인가 = room.availableCount === 1
          const 매진인가 = room.availableCount === 0

          const params = qs.stringify(
            {
              roomId: room.id,
              hotelId,
            },
            {
              addQueryPrefix: true,
            },
          )

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
                      <MyText>{room.roomName}</MyText>
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
                <Button
                  size="medium"
                  disabled={매진인가}
                  onClick={() => {
                    if (user == null) {
                      // 로그인이 필요한 기능입니다.
                      open({
                        title: '로그인이 필요한 기능입니다.',
                        onButtonClick: () => {
                          nav('/signin')
                        },
                      })

                      return
                    }

                    nav(`/schedule${params}`)
                  }}
                >
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
