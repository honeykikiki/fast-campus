import { css } from '@emotion/react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'
import Flex from './Flex'
import { colors } from '@/styles/colorPlatte'

function Nav() {
  const { pathname } = useLocation()
  const showSignButton = ['/signup', '/signin'].includes(pathname) === false

  return (
    <Flex justify="space-between" align="center" css={navBarContainerStyles}>
      <Link to="/">홈</Link>
      {showSignButton ? (
        <Link to="signin">
          <Button>회원가입/로그인</Button>
        </Link>
      ) : null}
      {/* {showSignButton ? (
        <Link to="signin">
          <Button>로그아웃</Button>
        </Link>
      ) : null} */}
    </Flex>
  )
}

const navBarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`

export default Nav
