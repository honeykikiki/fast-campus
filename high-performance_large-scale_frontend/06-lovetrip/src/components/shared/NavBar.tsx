import { colors } from '@styles/colorPlatte'
import { css } from '@emotion/react'
import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Button from './Button'
import Flex from './Flex'
import { Spacing } from './Spacing'
import useUser from '@/hooks/auth/userUser'

function Nav() {
  const { pathname } = useLocation()
  const showSignButton = ['/signup', '/signin'].includes(pathname) === false
  const user = useUser()

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Flex align="center">
          <Link to="/my">
            <img
              src={
                user.photoUrl ??
                'https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/circle-user-1024.png'
              }
              alt="유저의 이미지"
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
          </Link>
          <Spacing size={4} direction="horizontal" />
          <Link to="/settings">
            <img
              src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-06-1024.png"
              alt="세팅 아이콘"
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
          </Link>
        </Flex>
      )
    }
    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>회원가입/로그인</Button>
        </Link>
      )
    }

    return null
  }, [showSignButton, user])

  return (
    <Flex justify="space-between" align="center" css={navBarContainerStyles}>
      <Link to="/">LOVE-TRIP</Link>
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
  border-bottom: 1px solid ${colors.gray};
`

export default Nav
