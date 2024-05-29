import { useRouter } from 'next/router'
import Badge from '../shared/Badge'
import Button from '../shared/Button'
import ListRow from '../shared/ListRows'
import Skeleton from '../shared/Skeleton'
import MyText from '../shared/Text'
import withSuspense from '../shared/hocs/withSuspense'
import useCards from './hooks/useCards'
import { css } from '@emotion/react'
import { colors } from '@/styles/colorPlatte'

function CardList() {
  const { data } = useCards()
  const navigate = useRouter()

  const isShowMoreButton = (data?.items.length ?? 0) > 5

  return (
    <div style={{ padding: '24px 0' }}>
      <MyText
        bold={true}
        style={{ padding: '12px 24px', display: 'inline-block' }}
      >
        추천 카드
      </MyText>

      <ul>
        {data?.items.slice(0, 5).map((card, index) => (
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
            right={card.payback != null ? <Badge label={card.payback} /> : null}
            withArrow={true}
          />
        ))}
      </ul>
      {isShowMoreButton ? (
        <div style={{ padding: '24px 0 24px 24px' }}>
          <Button
            full={true}
            weak={true}
            size="medium"
            onClick={() => {
              navigate.push('/card')
            }}
          >
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export function CardListSkeleton() {
  return (
    <div style={{ padding: '24px 0' }}>
      <MyText
        bold={true}
        style={{ padding: '12px 24px', display: 'inline-block' }}
      >
        추천 카드
      </MyText>
      {[...new Array(5)].map((_, index) => (
        <ListRow.Skeleton key={index} />
      ))}
    </div>
  )
}

export default withSuspense(CardList, {
  fallback: <CardListSkeleton />,
})
