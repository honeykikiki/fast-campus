import { format } from 'date-fns'
import { useCallback, useState } from 'react'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import ListRow from '../shared/ListRows'
import { Spacing } from '../shared/Spacing'
import MyText from '../shared/Text'
import TextFiled from '../shared/TextField'
import useReview from './hooks/useReview'
import useUser from '@/hooks/auth/userUser'

function Review({ hotelId }: { hotelId: string }) {
  const { data: reviews, isLoading, write, remove } = useReview({ hotelId })
  const [text, setText] = useState('')
  const user = useUser()

  const reviewsRow = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <Flex direction="column" align="center">
          <img
            src="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Letter-1024.png"
            alt=""
            width={40}
            height={40}
          />
          <Spacing size={10} />
          <MyText typography="t6" color="gray700">
            아직 작성된 리뷰가 없습니다. 첫 리뷰를 작헝해보세요!
          </MyText>
          <Spacing size={10} />
        </Flex>
      )
    }

    return (
      <ul>
        {reviews?.map((review) => (
          <ListRow
            key={review.id}
            left={
              review.user?.photoUrl !== null ? (
                <img
                  src={
                    review.user?.photoUrl ??
                    'https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/circle-user-1024.png'
                  }
                  alt="유저의 이미지"
                  width={40}
                  height={40}
                  style={{ borderRadius: '100%' }}
                />
              ) : null
            }
            contents={
              <ListRow.Texts
                title={review.text}
                subTitle={format(review.createdAt, 'yyyy-MM-dd')}
              />
            }
            right={
              review.userId === user?.uid ? (
                <Button
                  onClick={() => {
                    remove({ reviewId: review.id, hotelId: review.hotelId })
                  }}
                >
                  삭제
                </Button>
              ) : null
            }
          />
        ))}
      </ul>
    )
  }, [remove, reviews, user?.uid])

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value)
    },
    [],
  )

  if (isLoading) {
    return null
  }

  return (
    <div>
      <MyText typography="t4" bold={true} style={{ padding: '40px 24px' }}>
        리뷰
      </MyText>
      <Spacing size={40} />
      {reviewsRow()}
      {user != null ? (
        <>
          <div style={{ padding: '40px 24px' }}>
            <TextFiled value={text} onChange={handleTextChange} />
            <Spacing size={6} />
            <Flex justify="flex-end">
              <Button
                disabled={text === ''}
                onClick={async () => {
                  const success = await write(text)

                  if (success) {
                    setText('')
                  }
                }}
              >
                제출
              </Button>
            </Flex>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Review
