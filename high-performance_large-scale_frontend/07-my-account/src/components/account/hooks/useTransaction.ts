import { useInfiniteQuery } from 'react-query'
import useUser from '@/hooks/useUser'
import { getTransactions } from '@/remote/transaction'

function useTransaction({ suspense }: { suspense?: boolean } = {}) {
  const user = useUser()

  return useInfiniteQuery(
    ['transaction', user?.id],
    ({ pageParam }) =>
      getTransactions({ pageParam, userId: user?.id as string }),
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
      suspense,
    },
  )
}

export default useTransaction
