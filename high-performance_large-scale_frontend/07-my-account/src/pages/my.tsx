import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRows'
import { Spacing } from '@/components/shared/Spacing'
import MyText from '@/components/shared/Text'
import withAuth from '@/hooks/withAuth'

function MyPage() {
  const router = useRouter()

  return (
    <div>
      <Spacing size={40} />
      <Flex justify="center">
        <Button onClick={() => signOut({ callbackUrl: '/' })}>로그아웃</Button>
      </Flex>

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ marginTop: '40px' }}
      />

      <ul>
        <ListRow
          contents={<ListRow.Texts title="약관" subTitle="약관목록 및 철회" />}
          withArrow={true}
          onClick={() => router.push('/settings/terms')}
        />
      </ul>
    </div>
  )
}

export default withAuth(MyPage)
