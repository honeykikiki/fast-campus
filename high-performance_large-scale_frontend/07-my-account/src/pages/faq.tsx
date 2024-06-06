import { collection, getDocs } from 'firebase/firestore'

import ListRow from '@/components/shared/ListRows'
import { COLLECTION } from '@/constants/collection'
import { store } from '@/remote/firebase'

interface FAQ {
  id: string
  question: string
  answer: string
}

function FAQPage({ faqs }: { faqs: FAQ[] }) {
  return (
    <div>
      {faqs.map((faq) => (
        <ListRow
          key={faq.id}
          contents={
            <ListRow.Texts title={faq.question} subTitle={faq.answer} />
          }
        />
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const snapshot = await getDocs(collection(store, COLLECTION.FAQ))

  const faqs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return {
    props: { faqs },
  }
}

export default FAQPage
