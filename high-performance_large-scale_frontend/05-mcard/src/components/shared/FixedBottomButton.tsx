import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { createPortal } from 'react-dom'
import Button from './Button'
import { colors } from '@/styles/colorPlatte'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
}

function FixedBottomButton({ label, onClick }: FixedBottomButtonProps) {
  const $portalRoot = document.querySelector('#root-portal')

  if ($portalRoot == null) {
    return null
  }

  return createPortal(
    <Container>
      <Button onClick={onClick} full={true} size="medium" css={buttonStyle}>
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const slideup = keyframes`
  to {
    transform: translateY(0%);

  }
`
const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
  transform: translateY(100%);
  animation: ${slideup} 0.5s ease-in-out forwards;
`

const buttonStyle = css`
  border-radius: 8px;
`

export default FixedBottomButton