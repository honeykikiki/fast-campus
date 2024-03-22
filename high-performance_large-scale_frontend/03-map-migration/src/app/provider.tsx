'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { RecoilRoot } from 'recoil';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from '@/components/Navbar';

const queryClient = new QueryClient();

interface Props {
  children?: React.ReactNode;
}

// Component, pageProps: { session, ...pageProps },

export const NextProvider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ToastContainer autoClose={10000} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SessionProvider>
    </RecoilRoot>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Navbar />
      {children}
    </div>
  );
};
