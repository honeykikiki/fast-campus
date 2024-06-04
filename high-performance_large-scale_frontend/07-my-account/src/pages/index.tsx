import { CardListSkeleton } from '@components/home/CardList'

import styled from '@emotion/styled'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { getSession, useSession } from 'next-auth/react'
import { QueryClient, dehydrate } from 'react-query'
import Account from '@/components/home/Account'
import { BannerSkeleton } from '@/components/home/EventBanners'
import { Spacing } from '@/components/shared/Spacing'
import useAccount from '@/hooks/useAccount'
import { User } from '@/models/user'
import { getAccount } from '@/remote/account'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
})

const CreditScore = dynamic(() => import('@components/home/CreditScore'), {
  ssr: false,
  loading: () => null,
})

const CardList = dynamic(() => import('@components/home/CardList'), {
  ssr: false,
  loading: () => <CardListSkeleton />,
})

export default function Home() {
  return (
    <Container>
      <EventBanners />
      <Account />
      <Spacing size={8} backgroundColor="gray100" />
      <CreditScore />
      <Spacing size={8} backgroundColor="gray100" />
      <CardList />
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery(['account', (session.user as User)?.id], () =>
      getAccount((session.user as User)?.id),
    )

    return {
      props: {
        dehydrateState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}
const Container = styled.div``
