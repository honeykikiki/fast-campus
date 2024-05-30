import { useCallback } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Button from './Button'
import Flex from './Flex'
import MyText from './Text'
import { colors } from '@/styles/colorPlatte'

function NavBar() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const showSignButton = ['/auth/signin'].includes(router.pathname) === false

  const renderButton = useCallback(() => {
    if (session != null) {
      return (
        <Link href="/my">
          <Image
            width={40}
            height={40}
            alt="유저이미지"
            src={session.user?.image ?? ''}
            style={{ borderRadius: '50%' }}
          />
        </Link>
      )
    }
    console.log(showSignButton)

    if (showSignButton) {
      return (
        <Link href="/auth/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [session, showSignButton])

  return (
    <Flex css={navBarStyles} justify="space-between" align="center">
      <Link href={'/'}>
        <MyText>My_Account</MyText>
      </Link>
      {renderButton()}
    </Flex>
  )
}

const navBarStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray100};
`

export default NavBar
