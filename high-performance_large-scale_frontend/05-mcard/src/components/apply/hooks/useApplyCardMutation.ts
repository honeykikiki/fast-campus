import { useMutation } from 'react-query'
import { useAlertContext } from '@/contexts/AlertContext'
import { ApplyValues } from '@/models/apply'
import { applyCard } from '@/remote/apply'

interface useApplyCardMutationProps {
  onSuccess: () => void
  onError: () => void
}

function useApplyCardMutation({
  onSuccess,
  onError,
}: useApplyCardMutationProps) {
  const { open } = useAlertContext()

  return useMutation((applyValues: ApplyValues) => applyCard(applyValues), {
    onSuccess: () => {
      onSuccess()
    },
    onError: () => {
      // 실패한 경우
      open({
        title: '카드신청에 실패했어요. 다시시도해주세요.',
        onButtonClick: () => {
          onError()
        },
      })
    },
  })
}

export default useApplyCardMutation
