import styled from '@emotion/styled'
import { colors, Colors } from '@/styles/colorPlatte'

interface SpacingProps {
  size: number
  direction?: 'vertical' | 'horizontal'
  backgroundColor?: Colors
}

export const Spacing = styled.div<SpacingProps>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical' ? `height: ${size}px;` : `width: ${size}px;`}
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${colors[backgroundColor]};`}
`
