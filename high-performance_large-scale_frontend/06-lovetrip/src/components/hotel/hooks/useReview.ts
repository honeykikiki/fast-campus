import { useQuery } from 'react-query'
import { getReview } from '@/remote/review'

function useReview({ hotelId }: { hotelId: string }) {
  const { data, isLoading } = useQuery(['reviews', hotelId], () =>
    getReview({ hotelId }),
  )

  return { data, isLoading }
}

export default useReview
