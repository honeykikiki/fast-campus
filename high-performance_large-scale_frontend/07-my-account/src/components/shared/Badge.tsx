import styled from '@emotion/styled'
import { colors } from '@styles/colorPlatte'

import MyText from './Text'

interface BadgeProps {
  label: string
}

function Badge({ label }: BadgeProps) {
  return (
    <Container>
      <MyText bold={true} typography="t7" color="white">
        {label}
      </MyText>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 12px;
  background-color: ${colors.blue};
  padding: 2px 8px;
`

export default Badge
