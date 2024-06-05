import { format, parseISO } from 'date-fns'
import { useCallback, useState } from 'react'
import { css } from '@emotion/react'
import { GetServerSidePropsContext } from 'next'

import { getSession } from 'next-auth/react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { QueryClient, dehydrate } from 'react-query'

import useTransaction from '@/components/account/hooks/useTransaction'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRows'
import MyText from '@/components/shared/Text'
import withAuth from '@/hooks/withAuth'
import { TransactionFilterType } from '@/models/transaction'
import { User } from '@/models/user'
import { getTransactions } from '@/remote/transaction'
import addDelimiter from '@/utils/addDelimiter'

const FILTER: Array<{ label: string; value: TransactionFilterType }> = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '입금',
    value: 'deposit',
  },
  {
    label: '출금',
    value: 'withdraw',
  },
]

function Transaction() {
  const [filter, setFilter] = useState<TransactionFilterType>('all')
  const {
    data,
    hasNextPage = false,
    isFetching,
    fetchNextPage,
  } = useTransaction({ filter })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  const transactions = data?.pages.map(({ items }) => items).flat() ?? []

  return (
    <div>
      <Flex as="ul" justify="flex-end" style={{ padding: 24, gap: 10 }}>
        {FILTER.map((filter) => (
          <li
            key={filter.label}
            onClick={() => {
              setFilter(filter.value)
            }}
          >
            {filter.label}
          </li>
        ))}
      </Flex>
      <InfiniteScroll
        dataLength={transactions?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        {transactions?.map((transaction) => {
          const 입금인가 = transaction.type === 'deposit'

          return (
            <ListRow
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
                    {입금인가 ? '+' : '-'} {addDelimiter(transaction.amount)}원
                  </MyText>
                  <MyText>{addDelimiter(transaction.balance)}원</MyText>
                </Flex>
              }
            />
          )
        })}
      </InfiniteScroll>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchInfiniteQuery([
      'transaction',
      (session.user as User)?.id,
      () => getTransactions({ userId: (session.user as User)?.id }),
    ])

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}

export default withAuth(Transaction)
