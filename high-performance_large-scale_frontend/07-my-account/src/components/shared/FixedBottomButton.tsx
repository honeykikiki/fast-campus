import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { colors } from '@styles/colorPlatte'
import { createPortal } from 'react-dom'

import Button from './Button'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

function FixedBottomButton({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) {
  const $portalRoot = document.querySelector('#root-portal')

  if ($portalRoot == null) {
    return null
  }

  return createPortal(
    <Container>
      <div css={buttonStyle}>
        <Button onClick={onClick} full={true} size="medium" disabled={disabled}>
          {label}
        </Button>
      </div>
    </Container>,
    $portalRoot,
  )
}

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
`

const buttonStyle = css`
  border-radius: 8px;
`

export default FixedBottomButton
