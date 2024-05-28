import { Swiper, SwiperSlide } from 'swiper/react'
import { css } from '@emotion/react'
import Image from 'next/image'
import Link from 'next/link'
import Flex from '../shared/Flex'
import withSuspense from '../shared/hocs/withSuspense'
import Skeleton from '../shared/Skeleton'
import MyText from '../shared/Text'
import useEventBanners from './hooks/useEventBanners'

function EventBanners() {
  const { data } = useEventBanners()

  console.log(data)

  return (
    <div>
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

export default withSuspense(EventBanners, {
  fallback: <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />,
})
