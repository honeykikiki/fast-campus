import { useState } from 'react'

import Form from '@/components/account/Form'
import Terms from '@/components/account/Terms'
import FullPageLoader from '@/components/shared/FullPageLoader'
import ProgressBar from '@/components/shared/ProgressBar'
import useUser from '@/hooks/useUser'
import withAuth from '@/hooks/withAuth'
import { Account } from '@/models/account'
import { User } from '@/models/user'
import { createAccount, getAccount, getTerm, setTerms } from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

// 0 약관동의,
// 1 계좌 개셜 폼 페이지
// 2 완료 페이지
const LAST_STEP = 2 // 완료페이지

function AccountNewPage({ initialStep }: { initialStep: number }) {
  const user = useUser()
  const [step, setStep] = useState(initialStep)
  const router = useRouter()

  const onNext = async (termIds: string[]) => {
    await setTerms({ userId: user?.id as string, termIds })

    setStep(step + 1)
  }

  return (
    <div>
      <ProgressBar progress={step / LAST_STEP} />
      {step === 0 ? <Terms onNext={onNext} /> : null}

      {step === 1 ? (
        <Form
          onNext={async (formValues) => {
            const newAccount = {
              ...formValues,
              accountNumber: Date.now(),
              balance: 0,
              status: 'READY',
              userId: user?.id as string,
            } as Account

            await createAccount(newAccount)
            setStep(step + 1)
          }}
        />
      ) : null}

      {step === 2 ? (
        <>
          <FullPageLoader message="계좌개설 신청이 완료되었어요" />
          <FixedBottomButton label="확인" onClick={() => router.push('/')} />
        </>
      ) : null}
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
  const account = await getAccount((session?.user as User).id)

  if (account == null) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  return {
    props: {
      initialStep: 2,
    },
  }
}

export default withAuth(AccountNewPage)
