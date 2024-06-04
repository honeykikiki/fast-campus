import { useQuery } from 'react-query'
import useAccount from '@/hooks/useAccount'
import { getEventBanners } from '@/remote/banner'

function useEventBanners() {
  // 유저가 계좌를 가지고 있는가?
  const { data: account } = useAccount()

  return useQuery(
    ['event-banner'],
    () =>
      getEventBanners({
        hasAccount: account != null && account.status === 'DONE',
      }),
    {
      suspense: true,
    },
  )
}

export default useEventBanners
