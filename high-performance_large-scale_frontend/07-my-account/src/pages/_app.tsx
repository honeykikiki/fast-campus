import Layout from '@components/shared/Layout'
import globalStyles from '@styles/globalStyles'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import NavBar from '@/components/shared/NavBar'
import { AlertContextProvider } from '@/context/AlertContext'
import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import { useReportWebVitals } from 'next/web-vitals'
import { SessionProvider } from 'next-auth/react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient()

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  useReportWebVitals((metric) => {
    console.log(metric)
  })

  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <Hydrate state={dehydratedState}>
            <ErrorBoundary>
              <AlertContextProvider>
                <NavBar />
                <Component {...pageProps} />
              </AlertContextProvider>
            </ErrorBoundary>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
