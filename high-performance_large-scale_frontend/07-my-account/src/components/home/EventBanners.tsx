import { Swiper, SwiperSlide } from 'swiper/react'

import useEventBanners from './hooks/useEventBanners'
import withSuspense from '../../hooks/withSuspense'
import ErrorBoundary from '../shared/ErrorBoundary'
import Flex from '../shared/Flex'
import Skeleton from '../shared/Skeleton'
import MyText from '../shared/Text'

import { css } from '@emotion/react'
import Image from 'next/image'
import Link from 'next/link'

function EventBanners() {
  const { data } = useEventBanners()

  return (
    <div style={{ padding: 24 }}>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link}>
                <Flex
                  style={{ backgroundColor: banner.backgroundColor }}
                  justify="space-between"
                  css={bannerStyles}
                >
                  {/* 왼쪽 */}
                  <Flex direction="column">
                    <MyText bold={true}>{banner.title}</MyText>
                    <MyText typography="t6">{banner.subTitle}</MyText>
                  </Flex>
                  {/* 오른쪽 */}
                  <Image src={banner.iconUrl} width={40} height={40} alt="" />
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

const bannerStyles = css`
  padding: 24px;
  border-radius: 6px;
`

export function BannerSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
    </div>
  )
}

function WrapErrorBoundary() {
  return (
    <ErrorBoundary fallbackComponent={<></>}>
      <EventBanners />
    </ErrorBoundary>
  )
}

export default withSuspense(WrapErrorBoundary, {
  fallback: <BannerSkeleton />,
})
