import { useEffect, useRef } from 'react'
import { useModalContext } from '@/contexts/ModalContext'
import { Wedding } from '@/models/wedding'

export default function AttendCountModal({ wedding }: { wedding: Wedding }) {
  const { open, close } = useModalContext()
  const havSeenModal = localStorage.getItem('@have-seen-modal')
  const $input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (havSeenModal === 'true') {
      return
    }

    open({
      title: `현재 참석자 ${wedding.attendCount}`,
      body: (
        <div className="">
          <input
            ref={$input}
            type="number"
            placeholder="참석 가능 인원을 추가해주세요."
            style={{ width: '100%' }}
          />
        </div>
      ),
      onLeftButtonClick: () => {
        localStorage.setItem('@have-seen-modal', 'true')
        close()
      },
      onRightButtonClick: async () => {
        if ($input.current == null) {
          return
        }

        await fetch('http://localhost:8888/wedding', {
          method: 'PUT',
          body: JSON.stringify({
            ...wedding,
            attendCount: wedding.attendCount + Number($input.current.value),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        localStorage.setItem('@have-seen-modal', 'true')
        close()
      },
    })
  }, [close, havSeenModal, open, wedding])

  return <div></div>
}
