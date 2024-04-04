import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { card_list } from '@/mock/data'
import { store } from '@/remote/firebase'

function CardListAddButton() {
  // store
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD))
      batch.set(docRef, card)
    })

    try {
      await batch.commit()
      alert('카드 리스트 추가완료')
    } catch (e) {
      console.log(e)
    }
  }

  return <Button onClick={handleButtonClick}>카드리스트 추가하기</Button>
}

export default CardListAddButton
