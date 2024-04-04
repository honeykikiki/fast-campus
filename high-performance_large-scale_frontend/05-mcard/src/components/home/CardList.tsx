import ListRow from '@shared/ListRows'
import { flatten } from 'lodash'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery } from 'react-query'
import { getCards } from '@/remote/card'

function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      // getNextPageParam 에서 넘겨준 pageParam을 사용해 다음 페이지를 불러온다.
      return getCards(pageParam)
    },
    {
      getNextPageParam: (snapShot) => {
        // snapShot.lastVisible 커서 정보를 2번쨰 함수로 넘겨준다.
        return snapShot.lastVisible
      },
    },
  )

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  if (data == null) {
    return null
  }

  // 데이터가 [[1], [2], [3] 2차원 배열로 들어가 [1, 2, 3] 구조로 변경
  const cards = flatten(data?.pages.map(({ items }) => items))

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<div>loader....</div>}
        next={loadMore}
      >
        {cards.map((card, idx) => (
          <ListRow
            key={card.id}
            left={<div>left</div>}
            contents={
              <ListRow.Texts title={`${idx + 1} 위`} subTitle={card.name} />
            }
            right={card.payback != null ? <div>${card.payback}</div> : null}
            withArrow
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default CardList
