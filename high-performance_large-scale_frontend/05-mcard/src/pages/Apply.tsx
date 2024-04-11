import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Apply from '@/components/apply'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import useUser from '@/hooks/auth/useUser'
import { APPLY_STATUS } from '@/models/apply'
import { updateApplyCard } from '@/remote/apply'

function ApplyPage() {
  const user = useUser()
  const { id } = useParams() as { id: string }
  const nav = useNavigate()
  const [readyToPoll, setReadyToPoll] = useState(false)

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        cardId: id,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      nav('/apply/done?success=true', {
        replace: true,
      })
    },
    onError: async () => {
      await updateApplyCard({
        cardId: id,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      nav('/apply/done?success=false', {
        replace: true,
      })
    },
    enabled: readyToPoll,
  })

  const { mutate, isLoading: 카드를_신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      console.log('카드추가')
      setReadyToPoll(true)

      // 값이 추가된 경우
    },
    onError: () => {
      window.history.back()
    },
  })

  if (readyToPoll || 카드를_신청중인가) {
    return <div>로딩중...</div>
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
