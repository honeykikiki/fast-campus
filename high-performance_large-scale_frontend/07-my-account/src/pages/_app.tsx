import Layout from '@components/shared/Layout'
import globalStyles from '@styles/globalStyles'
import { Global } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import AuthGuard from '@/components/auth/AuthGuard'

const client = new QueryClient()

export default function App({
  Component,
  pageProps: { dehydrate, session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <Hydrate state={dehydrate}>
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
