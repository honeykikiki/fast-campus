import { useQuery } from 'react-query'
import useUser from '@/hooks/useUser'
import { getCredit } from '@/remote/credit'

function useCredit() {
  const user = useUser()
  return useQuery(['credit', user?.id], () => getCredit(user?.id as string), {
    enabled: user != null,
  })
}

export default useCredit
