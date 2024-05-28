import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import Skeleton from '@/components/shared/Skeleton'
import Account from '@/components/home/Account'
import { BannerSkeleton } from '@/components/home/EventBanners'

const EventBanners = dynamic(() => import('@/components/home/EventBanners'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
})

export default function Home() {
  return (
    <Container>
      <EventBanners />
      <Account />
    </Container>
  )
}

const Container = styled.div``
