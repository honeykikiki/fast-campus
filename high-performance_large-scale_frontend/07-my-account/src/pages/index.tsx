import { css } from '@emotion/react'
import styled from '@emotion/styled'

export default function Home() {
  return (
    <>
      <Container>
        <div css={bold}>hello</div>
      </Container>
    </>
  )
}

const Container = styled.div`
  background: pink;
`

const bold = css`
  font-weight: bold;
`
