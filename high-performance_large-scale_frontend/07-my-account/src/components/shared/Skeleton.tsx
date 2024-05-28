import { colors } from '@styles/colorPlatte'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const opacity = keyframes`
  0% {
    opacity: 1;
  }

  50%{
    opacity: 0.4;
  }
  
  100%{
    opacity: 1;
  }
`
const Skeleton = styled.div<{ width: number | string; height: number }>(
  ({ width, height }) => ({
    width,
    height,
    backgroundColor: colors.gray100,
    animation: `${opacity} 2s ease-in-out 0.5s infinite`,
    borderRadius: 2,
  }),
)

export default Skeleton
