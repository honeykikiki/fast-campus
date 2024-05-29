import { useCallback } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { QueryClient, dehydrate, useInfiniteQuery } from 'react-query'
import Badge from '@/components/shared/Badge'
import Input from '@/components/shared/Input'
import ListRow from '@/components/shared/ListRows'
import Top from '@/components/shared/Top'
import { getCards } from '@/remote/card'
import { colors } from '@/styles/colorPlatte'

function CardListPage() {
  const navigate = useRouter()
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(['cards'], ({ pageParam }) => getCards(pageParam), {
    getNextPageParam: (snapShot) => {
      return snapShot.lastVisible
    },
  })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  if (data == null) {
    return null
  }

  const cards = data.pages.map(({ items }) => items).flat()

  return (
    <div>
      <Top title="추천카드" subTitle="회원님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input
          onFocus={() => {
            navigate.push('/card/search')
          }}
        />
      </div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        next={loadMore}
        loader={<ListRow.Skeleton />}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => (
            <ListRow
              key={card.id}
              onClick={() => {
                navigate.push(`/card/${card.id}`)
              }}
              style={css`
                cursor: pointer;
                &:hover {
                  background-color: ${colors.gray100};
                }
              `}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow={true}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export async function getServerSideProps() {
  const client = new QueryClient()

  await client.prefetchInfiniteQuery(['cards'], () => getCards())

  return {
    props: {
      dehydrate: JSON.parse(JSON.stringify(dehydrate(client))),
    },
  }
}

export default CardListPage
