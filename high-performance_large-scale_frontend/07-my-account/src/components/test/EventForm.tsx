import { collection, doc, setDoc } from 'firebase/firestore'
import { ChangeEvent, useCallback, useState } from 'react'

import Preview from '../event/Preview'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import TextFiled from '../shared/TextField'
import { store } from '@/remote/firebase'
import { COLLECTION } from '@/constants/collection'

function EventForm() {
  const [formValues, setFormValues] = useState({
    title: '',
    subTitle: '',
    contents: '',
    buttonLabel: '',
    link: '',
    endDate: '',
  })

  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    },
    [],
  )

  const handleSubmit = async () => {
    await setDoc(doc(collection(store, COLLECTION.EVENT)), formValues)

    alert('이벤트 추가 완료')
  }

  const 제출이가능한상태인가 = Object.values(formValues).every(
    (value) => value !== '',
  )

  return (
    <Flex direction="column">
      <Flex style={{ gap: 40 }}>
        <Flex style={{ flex: 1, gap: 20 }} direction="column">
          <TextFiled
            name="title"
            label="이벤트 제목"
            onChange={handleFormValues}
            value={formValues.title}
          />
          <TextFiled
            name="subTitle"
            label="이벤트 부제목"
            onChange={handleFormValues}
            value={formValues.subTitle}
          />
          <textarea
            style={{ height: 200 }}
            name="contents"
            onChange={handleFormValues}
            value={formValues.contents}
          />
          <TextFiled
            name="buttonLabel"
            label="버튼명"
            onChange={handleFormValues}
            value={formValues.buttonLabel}
          />
          <TextFiled
            name="link"
            label="링크"
            onChange={handleFormValues}
            value={formValues.link}
          />
          <TextFiled
            name="endDate"
            label="이벤트 종료날짜"
            onChange={handleFormValues}
            value={formValues.endDate}
          />
        </Flex>

        <Flex style={{ flex: 2 }}>
          <Preview data={formValues} mode="edit" />
        </Flex>
      </Flex>
      <Spacing size={40} />
      <Button onClick={handleSubmit} disabled={제출이가능한상태인가 === false}>
        저장하기
      </Button>
    </Flex>
  )
}

export default EventForm
