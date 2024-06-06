import { css } from '@emotion/react'

import Flex from './Flex'
import MyText from './Text'

interface TopProps {
  title: string
  subTitle: string
}
function Top({ title, subTitle }: TopProps) {
  return (
    <Flex direction="column" css={ContainerStyles}>
      <MyText typography="t4" bold={true}>
        {title}
      </MyText>
      <MyText typography="t7">{subTitle}</MyText>
    </Flex>
  )
}

const ContainerStyles = css`
  padding: 24px;
`

export default Top
