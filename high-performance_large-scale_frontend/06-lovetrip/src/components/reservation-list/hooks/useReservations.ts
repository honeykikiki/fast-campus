import { useQuery } from 'react-query'
import useUser from '@/hooks/auth/userUser'
import { getReservationList } from '@/remote/reservation'

function useReservations() {
  const user = useUser()
  const { data, isLoading } = useQuery(
    ['reservation', user?.uid],
    () => getReservationList({ userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )

  return { data, isLoading }
}

export default useReservations
