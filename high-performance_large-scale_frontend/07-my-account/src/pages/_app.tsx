import Layout from '@components/shared/Layout'
import globalStyles from '@styles/globalStyles'
import { Global } from '@emotion/react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'

const client = new QueryClient()

export default function App({
  Component,
  pageProps: { dehydrate, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <QueryClientProvider client={client}>
        <Hydrate state={dehydrate}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </Layout>
  )
}
