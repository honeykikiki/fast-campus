import { useQuery } from 'react-query'
import { getEventBanners } from '@/remote/banner'

function useEventBanners() {
  // 유저가 계좌를 가지고 있는가?

  return useQuery(
    ['event-banner'],
    () => getEventBanners({ hasAccount: true }),
    {
      suspense: true,
    },
  )
}

export default useEventBanners
