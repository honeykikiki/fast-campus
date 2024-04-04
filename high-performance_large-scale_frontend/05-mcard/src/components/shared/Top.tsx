import { css } from '@emotion/react'
import Flex from './Flex'
import Text from './Text'

interface Topprops {
  title: string
  subTitle: string
}
function Top({ title, subTitle }: Topprops) {
  return (
    <Flex direction="column" css={ContainerStyles}>
      <Text typography="t4" bold={true}>
        {title}
      </Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

const ContainerStyles = css`
  padding: 24px;
`

export default Top
