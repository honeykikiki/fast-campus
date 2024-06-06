import { CSSProperties } from 'react'

import styled from '@emotion/styled'
import { colors, Colors } from '@styles/colorPlatte'
import { Typography, typographyMap } from '@styles/typography'

interface TextProps {
  typography?: Typography
  color?: Colors
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  bold?: boolean
}

const MyText = styled.span<TextProps>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color],
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
    display,
  }),
  ({ typography = 't5' }) => typographyMap[typography],
)

export default MyText
