import { format, parseISO } from 'date-fns'

import withSuspense from '@/hooks/withSuspense'
import addDelimiter from '@/utils/addDelimiter'
import { css } from '@emotion/react'
import Link from 'next/link'

import Button from '../shared/Button'
import Flex from '../shared/Flex'
import ListRow from '../shared/ListRows'
import MyText from '../shared/Text'

import useTransactionㄴ from './hooks/useTransaction'

function Transaction() {
  const { data } = useTransactionㄴ({ suspense: true })

  const transactions = data?.pages
    .map(({ items }) => items)
    .flat()
    .slice(0, 5)
  return (
    <div style={{ padding: 24 }}>
      <MyText bold={true}>입출금 내역</MyText>

      {transactions?.length === 0 ? (
        <Flex style={{ padding: 24 }}>
          <MyText>아직 입출금 내역이 없어요</MyText>
        </Flex>
      ) : (
        <ul>
          {transactions?.map((transaction) => {
            const 입금인가 = transaction.type === 'deposit'

            return (
              <ListRow
                style={css`
                  padding: 24px 0px;
                `}
                key={transaction.id}
                contents={
                  <ListRow.Texts
                    title={transaction.displayText}
                    subTitle={format(parseISO(transaction.date), 'yyyy-MM-dd')}
                  />
                }
                right={
                  <Flex direction="column" align="flex-end">
                    <MyText color={입금인가 ? 'blue' : 'red'} bold={true}>
                      {입금인가 ? '+' : '-'} {addDelimiter(transaction.amount)}
                      원
                    </MyText>
                    <MyText>{addDelimiter(transaction.balance)}원</MyText>
                  </Flex>
                }
              />
            )
          })}
        </ul>
      )}
      <Link href={'/account/transactions'}>
        <div style={{ padding: '0 24px' }}>
          <Button full={true} size="medium" weak={true}>
            자세히 보기
          </Button>
        </div>
      </Link>
    </div>
  )
}

export default withSuspense(Transaction, {
  fallback: <div>로딩중 입니다.</div>,
})
