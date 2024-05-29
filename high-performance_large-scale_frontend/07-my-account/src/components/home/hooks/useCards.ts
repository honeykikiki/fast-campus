import { useQuery } from 'react-query'
import { getCards } from '@/remote/card'

function useCard() {
  return useQuery(['cards'], () => getCards(), {
    onSuccess: () => {},
    suspense: true,
  })
}

export default useCard
