import useUser from '@hooks/auth/useUser'
import { auth } from '@remote/firebase'
import { colors } from '@styles/colorPlatte'
import { css } from '@emotion/react'
import { signOut } from 'firebase/auth'
import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Button from './Button'
import Flex from './Flex'

function Nav() {
  const { pathname } = useLocation()
  const showSignButton = ['/signup', '/signin'].includes(pathname) === false
  const user = useUser()

  const handleLogout = useCallback(() => signOut(auth), [])

  const renderButton = useCallback(() => {
    if (user != null) {
      return <Button onClick={handleLogout}>로그아웃</Button>
    }

    if (showSignButton) {
      return (
        <Link to="signin">
          <Button>회원가입/로그인</Button>
        </Link>
      )
    }

    return null
  }, [handleLogout, showSignButton, user])

  return (
    <Flex justify="space-between" align="center" css={navBarContainerStyles}>
      <Link to="/">홈</Link>
      {renderButton()}
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
