import { useCallback } from 'react'
import dynamic from 'next/dynamic'

import { useRouter } from 'next/router'
import CreditScoreChart from '@/components/shared/CreditScoreChart'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRows'
import { Spacing } from '@/components/shared/Spacing'
import MyText from '@/components/shared/Text'
import { useAlertContext } from '@/context/AlertContext'
import useUser from '@/hooks/useUser'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

function CreditPage() {
  const 신용점수를조회했는가 = false
  const router = useRouter()
  const user = useUser()
  const { open } = useAlertContext()

  const handleCheck = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요한 기능이예요',
        description: '정확한 신용정보를 표시하기 위해 로그인을 진행해 주세요.',
        onButtonClick: () => {
          router.push('/auth/signin')
        },
      })
      return
    }

    router.push('/credit/check')
  }, [open, router, user])

  if (신용점수를조회했는가 === false) {
    return (
      <div>
        {' '}
        <Spacing size={40} />
        <Flex direction="column" align="center">
          <MyText typography="t4" bold={true} textAlign="center">
            나의 신용점수
          </MyText>
          <Spacing size={10} />
          {/* 실제 점수 */}
          <CreditScoreChart score={0} width={80} height={80} />
        </Flex>
        <Spacing size={80} />
        <ul>
          <ListRow
            contents={
              <ListRow.Texts
                title="추천카드"
                subTitle="나에게 맞는 카드 찾아보기"
              />
            }
            withArrow={true}
            onClick={() => {
              router.push('/card')
            }}
          />
        </ul>
        <FixedBottomButton label="신용점수 올리기" onClick={handleCheck} />
      </div>
    )
  }

  return (
    <div>
      <Spacing size={40} />
      <Flex direction="column" align="center">
        <MyText typography="t4" bold={true} textAlign="center">
          내 신용점수를 조회하고
          <br /> 관리해보세요.
        </MyText>
        <Spacing size={10} />
        <CreditScoreChart score={0} width={80} height={80} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          contents={
            <ListRow.Texts
              title="정확한 신용평점"
              subTitle="대표 신용평가 기관의 데이터로 관리해요"
            />
          }
        />
        <ListRow
          contents={
            <ListRow.Texts
              title="신용점수 무료조회"
              subTitle="신용점수에 영향없이 무료로 조회가 가능해요"
            />
          }
        />
      </ul>
      <FixedBottomButton
        label="30초만에 신용점수 조회하기"
        onClick={handleCheck}
      />
    </div>
  )
}

export default CreditPage
