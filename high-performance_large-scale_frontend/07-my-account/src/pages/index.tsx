import { CardListSkeleton } from '@components/home/CardList'

import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import Account from '@/components/home/Account'
import { BannerSkeleton } from '@/components/home/EventBanners'
import { Spacing } from '@/components/shared/Spacing'

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
  const { data } = useSession()

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

const Container = styled.div``
