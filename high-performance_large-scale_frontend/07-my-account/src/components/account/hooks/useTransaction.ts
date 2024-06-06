import useUser from '@/hooks/useUser'
import { TransactionFilterType } from '@/models/transaction'
import { getTransactions } from '@/remote/transaction'
import { useInfiniteQuery } from 'react-query'

function useTransactionㄴ({
  suspense,
  filter = 'all',
}: { suspense?: boolean; filter?: TransactionFilterType } = {}) {
  const user = useUser()

  return useInfiniteQuery(
    ['transaction', user?.id, filter],
    ({ pageParam }) =>
      getTransactions({ pageParam, userId: user?.id as string, filter }),
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
      suspense,
    },
  )
}

export default useTransactionㄴ
