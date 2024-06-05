import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import useUser from '@/hooks/useUser'
import { User } from '@/models/user'
import { getTerm as getTerms } from '@/remote/account'

function TermsPage() {
  const user = useUser()
  const { data } = useQuery(
    ['terms', user?.id],
    () => getTerms(user?.id as string),
    {
      enabled: user != null,
    },
  )

  console.log(data)

  return <div>TermsPage</div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery(['terms', (session.user as User).id], () =>
      getTerms((session.user as User).id),
    )

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}

export default TermsPage
