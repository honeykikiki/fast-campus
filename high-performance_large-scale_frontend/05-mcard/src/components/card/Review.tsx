import { useInView } from 'react-intersection-observer'
import { useQuery } from 'react-query'
import Skeleton from '../shared/Skeleton'
import { Spacing } from '../shared/Spacing'

function Review() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  })
  const { data = [], isLoading } = useQuery(
    ['review'],
    () => {
      return new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve(['너무 좋아요', '꼭 신청하세요!!'])
        }, 2_000)
      })
    },
    {
      enabled: inView,
    },
  )
  console.log(inView)

  return (
    <div ref={ref}>
      {isLoading ? (
        <>
          <Skeleton width={30} height={10}></Skeleton>
          <Spacing size={10} />
          <Skeleton width={30} height={10}></Skeleton>
        </>
      ) : (
        data.map((review, idx) => <div key={idx}>{review}</div>)
      )}
    </div>
  )
}

export default Review
