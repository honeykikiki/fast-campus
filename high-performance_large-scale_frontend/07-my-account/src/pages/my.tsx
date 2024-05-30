import { useCallback } from 'react'
import { signOut } from 'next-auth/react'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import withAuth from '@/components/shared/hocs/withAuth'
import { Spacing } from '@/components/shared/Spacing'

function myPage() {
  return (
    <div>
      <Spacing size={100} />
      <Flex justify="center">
        <Button onClick={() => signOut({ callbackUrl: '/' })}>로그아웃</Button>
      </Flex>
    </div>
  )
}

export default withAuth(myPage)
