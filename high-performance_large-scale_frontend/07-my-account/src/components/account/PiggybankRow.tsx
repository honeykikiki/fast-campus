import { differenceInDays } from 'date-fns'

import Flex from '../shared/Flex'
import ListRow from '../shared/ListRows'
import MyText from '../shared/Text'
import useUser from '@/hooks/useUser'
import withSuspense from '@/hooks/withSuspense'
import { getPiggybank } from '@/remote/piggybank'
import addDelimiter from '@/utils/addDelimiter'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

function PiggybankRow() {
  const router = useRouter()
  const user = useUser()
  const { data } = useQuery(
    ['piggybank', user?.id],
    () => getPiggybank(user?.id as string),
    { suspense: true },
  )

  if (data == null) {
    return (
      <div>
        <ul>
          <ListRow
            left={
              <Image
                src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-512.png"
                width={40}
                height={40}
                alt=""
              />
            }
            contents={
              <ListRow.Texts
                title="저금통"
                subTitle="매일 매일 조금씩 저축허가~"
              />
            }
            withArrow={true}
            onClick={() => {
              router.push('/account/piggybank/new')
            }}
          />
        </ul>
      </div>
    )
  }

  const { name, endDate, goalAmount, balance } = data
  const dDay = differenceInDays(endDate, new Date())

  return (
    <div>
      <ul>
        <ListRow
          left={
            <Image
              src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-512.png"
              width={40}
              height={40}
              alt=""
            />
          }
          contents={
            <Flex direction="column">
              <MyText typography="t4" bold={true}>
                D-{dDay}
              </MyText>
              <MyText>{addDelimiter(goalAmount - balance)}원</MyText>
            </Flex>
          }
          withArrow={true}
          onClick={() => {
            // 저금통 상세보기
            // 저금통 리스트
          }}
        />
      </ul>
    </div>
  )
}

export default withSuspense(PiggybankRow, {
  fallback: <div>로딩중....</div>,
})
