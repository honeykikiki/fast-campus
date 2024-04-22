import styled from '@emotion/styled'
import { Colors, colors } from '@/styles/colorPlatte'

interface TagProps {
  color?: string
  backgroundColor?: string
  type?: 'sm' | 'md' | 'lg'
}

const Tag = styled.span<TagProps>(
  ({ color = colors.white, backgroundColor = colors.blue, type }) => {
    let styles = {
      fontSize: '11px',
      padding: '4px 5px',
      fontWeight: 'bold',
      borderRadius: '2px',
      color: color in colors ? colors[color as Colors] : color,
      backgroundColor:
        backgroundColor in colors
          ? colors[backgroundColor as Colors]
          : backgroundColor,
    }

    if (type === 'sm') {
      styles = {
        ...styles,
        fontSize: '10px',
        padding: '3px 4px',
      }
    } else if (type === 'lg') {
      styles = {
        ...styles,
        fontSize: '12px',
        padding: '5px 6px',
      }
    }

    return styles
  },
)

export default Tag
