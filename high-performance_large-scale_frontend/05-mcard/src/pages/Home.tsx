import AdBanners from '@/components/home/AdBanners'
import CardList from '@/components/home/CardList'
import Top from '@/components/shared/Top'

function HomePage() {
  return (
    <div>
      <Top title="혜택좋은카드" subTitle="회원님을 위해서 좋아용" />
      <AdBanners />
      <CardList />
    </div>
  )
}

export default HomePage
