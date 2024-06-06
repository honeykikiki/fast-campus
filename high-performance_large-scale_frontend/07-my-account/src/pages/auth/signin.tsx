import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import MyText from '@/components/shared/Text'
import { BuiltInProviderType } from 'next-auth/providers'
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from 'next-auth/react'

function SigninPage({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >
}) {
  return (
    <div>
      <Flex direction="column" align="center">
        <MyText bold={true}>MyAccount</MyText>
        <Spacing size={80} />
        <ul>
          {Object.values(providers).map((provider) => (
            <li key={provider.id}>
              <Button
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: '/',
                  })
                }
              >
                {provider.name} Login
              </Button>
            </li>
          ))}
        </ul>
      </Flex>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}

export default SigninPage
