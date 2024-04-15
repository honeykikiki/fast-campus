import { parse } from 'qs'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'

function ApplyDonePage() {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  })

  return (
    <Flex align="center" justify="center">
      <Text
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {success === 'true' ? '카드발급 성공~~' : '카드발급실패'}
      </Text>

      <img
        width="100%"
        src="https://cdn.pixabay.com/animation/2023/10/21/02/28/02-28-10-555_512.gif"
        alt=""
      />
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
