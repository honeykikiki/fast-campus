import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { RecoilRoot } from 'recoil';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SessionProvider>
    </RecoilRoot>
  );
}
