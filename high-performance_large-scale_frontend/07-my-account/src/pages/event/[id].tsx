import { isAfter, parseISO } from 'date-fns'
import { GetServerSidePropsContext } from 'next'
import { useQuery } from 'react-query'
import Preview from '@/components/event/Preview'
import { useAlertContext } from '@/context/AlertContext'
import { Event } from '@/models/event'
import { getEvent } from '@/remote/event'

interface EventPageProps {
  initialEvent: Event
  id: string
}

function EventPage({ initialEvent, id }: EventPageProps) {
  const { open } = useAlertContext()
  const { data } = useQuery(['event', id], () => getEvent(id), {
    initialData: initialEvent,
    onSuccess: (event) => {
      const 이벤트가_종료_되었는가 = isAfter(
        new Date(),
        parseISO(event.endDate),
      )

      if (이벤트가_종료_되었는가) {
        open({
          title: `${event.title}\n종료된 이벤트 입니다.`,
          description: '다음에 더 좋은 이벤트로 찾아오겠습니다.',
          onButtonClick: () => {
            window.history.back()
          },
        })
      }
    },
  })

  if (data == null) {
    return null
  }

  return <Preview data={data} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query
  const event = await getEvent(id as string)

  return {
    props: { id, initialEvent: event },
  }
}

export default EventPage
