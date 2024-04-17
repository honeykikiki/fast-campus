import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Apply from '@/components/apply'
import useAppliedCard from '@/components/apply/hooks/useAppliedCard'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import FullPageLoader from '@/components/shared/FullPageLoader'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/auth/useUser'
import { APPLY_STATUS } from '@/models/apply'
import { updateApplyCard } from '@/remote/apply'

const STATUS_MESSAGE = {
  [APPLY_STATUS.READY]: '카드 심사를 준비하고 있습니다.',
  [APPLY_STATUS.PROGRESS]: '카드를 심사 중입니다. 잠시만 기다려 주세요.',
  [APPLY_STATUS.COMPLETE]: '카드 신청이 완료 되었습니다.',
}

function ApplyPage() {
  const { open } = useAlertContext()
  const user = useUser()
  const { id: cardId } = useParams() as { id: string }
  const nav = useNavigate()
  const [readyToPoll, setReadyToPoll] = useState(false)

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: cardId,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return
        }

        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              localStorage.removeItem(`applied-${user?.uid}-${cardId}`)
              window.history.back()
            },
          })
          return
        }

        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  const { data: status } = usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        cardId: cardId,
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
        cardId: cardId,
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
      setReadyToPoll(true)

      // 값이 추가된 경우
    },
    onError: () => {
      window.history.back()
    },
  })

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null
  }

  if (true || readyToPoll || 카드를_신청중인가) {
    return <FullPageLoader message={STATUS_MESSAGE[status ?? 'READY']} />
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
