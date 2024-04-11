import { parse } from 'qs'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'

function ApplyDonePage() {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  })

  return (
    <Flex>
      <Text>{success === 'true' ? '카드발급' : '카드발급실패'}</Text>
      <FixedBottomButton
        label="확인"
        onClick={() => {
          window.history.back()
        }}
      />
    </Flex>
  )
}

export default ApplyDonePage
