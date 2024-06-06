import { useCallback, useMemo } from 'react'

import Button from '@/components/shared/Button'
import ListRow from '@/components/shared/ListRows'
import MyText from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { 약관목록 } from '@/constants/account'
import useUser from '@/hooks/useUser'
import { User } from '@/models/user'
import { getTerm as getTerms, updateTerms } from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'

function TermsPage() {
  const user = useUser()
  const client = useQueryClient()
  const { data } = useQuery(
    ['terms', user?.id],
    () => getTerms(user?.id as string),
    {
      enabled: user != null,
    },
  )
  const 동의한약관목록 = useMemo(() => {
    if (data == null) {
      return null
    }

    const 동의한전체약관목록 = 약관목록.filter(({ id }) =>
      data.termIds.includes(id),
    )

    const 필수약관 = 동의한전체약관목록.filter(
      ({ mandatory }) => mandatory === true,
    )
    const 선택약관 = 동의한전체약관목록.filter(
      ({ mandatory }) => mandatory === false,
    )

    return { 필수약관, 선택약관 }
  }, [data])

  const { mutate, isLoading } = useMutation(
    (termIds: string[]) => updateTerms(user?.id as string, termIds),
    {
      onSuccess: () => {
        client.invalidateQueries(['terms', user?.id])
      },
    },
  )

  const handleDisagree = useCallback(
    (selectedTermIds: string) => {
      const updateTermIds = data?.termIds.filter(
        (termId) => termId !== selectedTermIds,
      )

      if (updateTermIds != null) {
        mutate(updateTermIds)
      }
    },
    [data?.termIds, mutate],
  )

  return (
    <div>
      <Top title="약관" subTitle="약관 리스트 및 철회" />

      {동의한약관목록 == null ? (
        <MyText>동의한 약관이 없습니다.</MyText>
      ) : (
        <ul>
          {동의한약관목록?.필수약관.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[필수] ${term.title}`} subTitle />
              }
            />
          ))}
          {동의한약관목록?.선택약관.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[선택] ${term.title}`} subTitle />
              }
              right={
                <Button
                  onClick={() => handleDisagree(term.id)}
                  disabled={isLoading === true}
                >
                  철회
                </Button>
              }
            />
          ))}
        </ul>
      )}
    </div>
  )
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
