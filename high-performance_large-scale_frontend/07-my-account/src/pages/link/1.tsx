import Spacing from '@/components/shared/Spacing'
import Link from 'next/link'

function Link1Page() {
  return (
    <div>
      <Spacing size={1000} />
      <Link href="/link/2" prefetch={false}>
        링크2로 이ㄴㄴㄴ동
      </Link>
    </div>
  )
}
export default Link1Page
