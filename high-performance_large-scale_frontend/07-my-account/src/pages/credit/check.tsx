import { useState } from 'react'

import { useMutation } from 'react-query'

import useCreditCheck from '@/components/credit/hooks/useCreditCheck'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import FullPageLoader from '@/components/shared/FullPageLoader'
import { CHECK_STATUS } from '@/constants/credit'
import { useAlertContext } from '@/context/AlertContext'
import useUser from '@/hooks/useUser'
import { updateCredit } from '@/remote/credit'

function CreditCheckPage() {
  const [readyToPoll, setReadyToPoll] = useState(true)
  const { open } = useAlertContext()
  const user = useUser()

  const { mutate } = useMutation((creditScore: number) =>
    updateCredit({ userId: user?.id as string, creditScore }),
  )

  const { data: status } = useCreditCheck({
    onSuccess: (creditScore) => {
      setReadyToPoll(false)

      mutate(creditScore)
    },
    onError: () => {
      setReadyToPoll(false)
      open({
        title: '신용정보 조회에 실패했어요',
        description: '잠시 후 다시 시도해 주세요.',
        onButtonClick: () => {
          window.history.back()
        },
      })
    },
    enabled: readyToPoll,
  })

  return (
    <div>
      <FullPageLoader
        message={STATUE_CHECK_MESSAGE[status ?? CHECK_STATUS.READY]}
      />
      {status === CHECK_STATUS.COMPLETE ? (
        <FixedBottomButton
          label="조회완료"
          onClick={() => {
            window.history.back()
          }}
        />
      ) : null}
    </div>
  )
}
const STATUE_CHECK_MESSAGE = {
  [CHECK_STATUS.READY]: '신용정보 조회을 위해 정보를 준비하고 있어요',
  [CHECK_STATUS.PROGRESS]: '신용정보를 조회 중입니다. 잠시만 기다려주세요.',
  [CHECK_STATUS.COMPLETE]: '신용점수 조회가 완료되었습니다.',
}

export default CreditCheckPage
