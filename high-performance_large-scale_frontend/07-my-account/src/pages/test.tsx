import Flex from '@/components/shared/Flex'
import { Spacing } from '@/components/shared/Spacing'
import MyText from '@/components/shared/Text'
import CardListAddButton from '@/components/test/CardListAddButton'
import EventButtonAddBanner from '@/components/test/EventButtonAddBanner'
import EventForm from '@/components/test/EventForm'
import TransactionForm from '@/components/test/TransactionForm'

function TestPage() {
  return (
    <Flex direction="column">
      <MyText bold={true}>배너</MyText>
      <EventButtonAddBanner />
      <Spacing
        size={20}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <MyText bold={true}>카드</MyText>
      <CardListAddButton />
      <Spacing
        size={20}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <MyText bold={true}>컨텐츠</MyText>
      <EventForm />
      <Spacing
        size={20}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <MyText bold={true}>입출금 테스트</MyText>
      <TransactionForm />
      <Spacing
        size={20}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
    </Flex>
  )
}

export default TestPage
