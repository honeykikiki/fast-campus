import { getAdBanner } from '@remote/adBanner'
import { getCards } from '@remote/card'
import { useEffect } from 'react'
import Top from '@/components/shared/Top'

function HomePage() {
  useEffect(() => {}, [])
  return (
    <div>
      <Top title="혜택좋은카드" subTitle="회원님을 위해서 좋아용" />
    </div>
  )
}

export default HomePage
