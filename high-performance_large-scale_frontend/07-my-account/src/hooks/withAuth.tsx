import { ComponentType } from 'react'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

function withAuth<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
) {
  return function AuthenticateComponent(props: Props) {
    const { data, status } = useSession()
    const router = useRouter()

    if (status === 'loading') {
      return null
    }

    if (data == null) {
      router.replace('/auth/signin')
    }

    return <WrappedComponent {...(props as any)} />
  }
}

export default withAuth

// withSuspense(<App/>), { fallback: <로딩텀포넌트 />}
