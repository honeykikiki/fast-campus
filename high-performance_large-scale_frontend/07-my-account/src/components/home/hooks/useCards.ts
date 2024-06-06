import { getCards } from '@/remote/card'
import { useQuery } from 'react-query'

function useCard() {
  return useQuery(['home-cards'], () => getCards(), {
    onSuccess: () => {},
    suspense: true,
  })
}

export default useCard
