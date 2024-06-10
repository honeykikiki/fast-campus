import { collection, doc, writeBatch } from 'firebase/firestore'
import { useCallback } from 'react'

import Button from '../shared/Button'
import { COLLECTION } from '@/constants/collection'
import { store } from '@/remote/firebase'

const FAQS = [
  {
    question: '우리 서비스를 이용하 시는 방법을 설명 드려요',
    answer: '가입하세용',
  },
  {
    question: '우리 서비스를 이용하 시는 방법을 설명 드려요123',
    answer: '가입하세용',
  },
  {
    question: '우리 서비스를 이용하 시는 방법을 설명 드려요344434',
    answer: '가입하세용',
  },
  {
    question: '우리 서비스를 이용하 시는 방법을 설명 드려요456456456',
    answer: '가입하세용',
  },
]

function FAQAddButton() {
  const handleButtonClick = useCallback(() => {
    const batch = writeBatch(store)

    FAQS.forEach((faq) => {
      const docRef = doc(collection(store, COLLECTION.FAQ))

      batch.set(docRef, faq)
    })

    batch.commit()
    alert('완료')
  }, [])

  return <Button onClick={handleButtonClick}>FAQAddButton</Button>
}

export default FAQAddButton
