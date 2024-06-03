import { useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import Terms from '@/components/account/Terms'
import ProgressBar from '@/components/shared/ProgressBar'
import useUser from '@/hooks/useUser'
import withAuth from '@/hooks/withAuth'
import { User } from '@/models/user'
import { getTerm, setTerms } from '@/remote/account'

// 0 약관동의,
// 1 계좌 개셜 폼 페이지
// 2 완료 페이지
const LAST_STEP = 2 // 완료페이지

function AccountNewPage({ initialStep }: { initialStep: number }) {
  const user = useUser()
  const [step, setStep] = useState(initialStep)

  const onNext = async (termIds: string[]) => {
    console.log(termIds)
    await setTerms({ userId: user?.id as string, termIds })

    setStep(step + 1)
  }

  return (
    <div>
      <ProgressBar progress={step / LAST_STEP} />
      {step === 0 ? <Terms onNext={onNext} /> : null}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  const agreedTerms = await getTerm((session?.user as User).id)

  if (agreedTerms == null) {
    return {
      props: {
        initialStep: 0,
      },
    }
  }

  if (agreedTerms != null) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  return {
    props: {
      initialStep: 0,
    },
  }
}

export default withAuth(AccountNewPage)
