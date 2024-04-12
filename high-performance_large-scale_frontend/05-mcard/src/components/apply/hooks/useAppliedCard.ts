import { useQuery, UseQueryOptions } from 'react-query'
import { ApplyValues } from '@/models/apply'
import { getAppliedCard } from '@/remote/apply'

function useAppliedCard({
  userId,
  cardId,
  options,
}: {
  userId: string
  cardId: string
  options?: Pick<
    UseQueryOptions<ApplyValues | null>,
    'onSuccess' | 'onError' | 'suspense'
  >
}) {
  return useQuery(
    ['applied', userId, cardId],
    () => getAppliedCard({ userId, cardId }),
    options,
  )
}

export default useAppliedCard
