import { Suspense } from 'react'
import AdBanners from '@/components/home/AdBanners'
import CardList from '@/components/home/CardList'
import ListRow from '@/components/shared/ListRows'
import Top from '@/components/shared/Top'

function HomePage() {
  return (
    <div>
      <Top title="혜택좋은카드" subTitle="회원님을 위해서 좋아용" />
      <AdBanners />
      <Suspense
        fallback={[...new Array(10)].map((_, idx) => (
          <ListRow.Skeleton key={idx}></ListRow.Skeleton>
        ))}
      >
        <CardList />
      </Suspense>
    </div>
  )
}

export default HomePage
