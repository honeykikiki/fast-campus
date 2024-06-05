import { format } from 'date-fns'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'
import Flex from '@/components/shared/Flex'
import { Spacing } from '@/components/shared/Spacing'
import TextFiled from '@/components/shared/TextField'
import { useAlertContext } from '@/context/AlertContext'
import useUser from '@/hooks/useUser'
import withAuth from '@/hooks/withAuth'
import { Piggybank } from '@/models/piggybank'
import { createPiggybank } from '@/remote/piggybank'

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
  { ssr: false },
)

function NewPiggybankPage() {
  const user = useUser()
  const { open } = useAlertContext()
  const [formValues, setFormValues] = useState({
    name: '',
    endDate: '',
    goalAmount: '',
  })

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const { mutate, isLoading } = useMutation(
    (newPiggybank: Piggybank) => createPiggybank(newPiggybank),
    {
      onSuccess: () => {
        open({
          title: '새로운 저금통을 만들었어요',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
      onError: () => {
        open({
          title: '저금통 생성에 실패했어요',
          description: '잠시후 다시 시도해주세요.',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
    },
  )

  const handleSubmit = useCallback(() => {
    const newPiggybank = {
      ...formValues,
      goalAmount: Number(formValues.goalAmount),
      userId: user?.id,
      startDate: new Date(),
      endDate: new Date(formValues.endDate),
      balance: 0,
    } as Piggybank

    mutate(newPiggybank)
  }, [formValues, mutate, user?.id])

  const min = useMemo(() => format(new Date(), 'yyyy-MM-dd'), [])

  return (
    <div style={{ padding: 24 }}>
      <Flex direction="column">
        <TextFiled
          name="name"
          label="통장이름"
          value={formValues.name}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <TextFiled
          name="endDate"
          label="종료일자"
          type="date"
          min={min}
          value={formValues.endDate}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <TextFiled
          name="goalAmount"
          label="목표금액"
          type="number"
          value={formValues.goalAmount}
          onChange={handleFormValues}
        />
        <FixedBottomButton
          label="저금통 생성하기"
          onClick={handleSubmit}
          disabled={isLoading === true}
        />
      </Flex>
    </div>
  )
}

export default withAuth(NewPiggybankPage)
