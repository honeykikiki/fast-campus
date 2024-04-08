import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import { Spacing } from '@shared/Spacing'
import TextFiled from '@shared/TextField'
import { css } from '@emotion/react'

function Form() {
  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextFiled label="이메일" placeholder="이메일을 입력해주세요." />
      <Spacing size={16} />
      <TextFiled label="패스워드" type="password" />
      <Spacing size={16} />
      <TextFiled label="패스워드 재확인" type="password" />
      <Spacing size={16} />
      <TextFiled label="이름" placeholder="이름을 입력해주세요." />

      <FixedBottomButton label="회원가입" onClick={() => {}} disabled={true} />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

export default Form
