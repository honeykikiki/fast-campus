import Link from 'next/link'
import Button from '../shared/Button'
import CreditScoreChart from '../shared/CreditScoreChart'
import Flex from '../shared/Flex'
import ListRow from '../shared/ListRows'

import { Spacing } from '../shared/Spacing'
import MyText from '../shared/Text'
import withSuspense from '@/hooks/withSuspense'

function CreditScore() {
  return (
    <ListRow
      contents={
        <Flex direction="column">
          <MyText bold={true}>
            나의 신용도를 증명하고 <br />
            점수를 올리세요
          </MyText>
          <Spacing size={8} />
          <Link href="/credit">
            <Button>내 신용점수 보러가기</Button>
          </Link>
        </Flex>
      }
      right={<CreditScoreChart score={500} width={80} height={80} />}
    />
  )
}

export function CreditScoreSkeleton() {
  return <ListRow.Skeleton />
}

export default CreditScore
