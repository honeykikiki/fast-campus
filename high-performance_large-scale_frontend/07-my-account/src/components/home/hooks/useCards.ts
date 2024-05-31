import { useQuery } from 'react-query'
import { getCards } from '@/remote/card'

function useCard() {
  return useQuery(['home-cards'], () => getCards(), {
    onSuccess: () => {},
    suspense: true,
  })
}

export default useCard
