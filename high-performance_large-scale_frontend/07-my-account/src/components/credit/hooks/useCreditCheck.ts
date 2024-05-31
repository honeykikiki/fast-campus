import { useQuery } from 'react-query'
import { CHECK_STATUS } from '@/constants/credit'

interface useCreditCheckProps {
  onSuccess: (creditScore: number) => void
  onError: () => void
  enabled: boolean
}

function useCreditCheck({ onSuccess, onError, enabled }: useCreditCheckProps) {
  return useQuery(['useCreditCheck'], () => getCheckStatue(), {
    enabled: enabled,
    refetchInterval: 2_000,
    staleTime: 0,
    onSuccess: (status) => {
      console.log(status)
      if (status === CHECK_STATUS.COMPLETE) {
        onSuccess(getCreditScore(200, 1_000))
      }
    },
    onError,
  })
}

function getCheckStatue() {
  const values = [
    CHECK_STATUS.READY,
    CHECK_STATUS.PROGRESS,
    CHECK_STATUS.COMPLETE,
    CHECK_STATUS.REJECT,
  ]

  const statues = values[Math.floor(Math.random() * values.length)]

  if (statues === CHECK_STATUS.REJECT) {
    throw new Error('신용정보 조회에 실패했습니다.')
  }

  return statues
}

function getCreditScore(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default useCreditCheck
