import { collection, doc, writeBatch } from 'firebase/firestore'

import Button from '../shared/Button'
import { COLLECTION } from '@/constants/collection'
import { card_list } from '@/mock/card'
import { store } from '@/remote/firebase'

function CardListAddButton() {
  const handleClickButton = async () => {
    let batch = writeBatch(store)

    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTION.CARD))

      batch.set(docRef, card)
    })
    await batch.commit()

    alert('추가 완료')
  }

  return <Button onClick={handleClickButton}>CardListAddButton</Button>
}

export default CardListAddButton
