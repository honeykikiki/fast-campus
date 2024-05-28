import Image from 'next/image'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import ListRow from '../shared/ListRows'
import { Spacing } from '../shared/Spacing'
import MyText from '../shared/Text'

function Account() {
  const hasAccount = false

  if (hasAccount) {
    return (
      <ListRow
        contents={
          <Flex direction="column">
            <MyText typography="t6" color="gray600">
              울라프 회원님의 자산
            </MyText>
            <Spacing size={2} />
            <MyText typography="t3" bold={true}>
              7,000원
            </MyText>
          </Flex>
        }
        right={<Button>분석</Button>}
      />
    )
  }

  // 계좌를 보유증이지 않고
  // 계좌를 계설하는 중일수도 있다.
  // READY | DONE
  const 계좌개설상태 = 'READY'
  const title =
    계좌개설상태 === 'READY'
      ? '만들고 있으신\n계좌가 있으시군요'
      : '계좌 개설이\n더 쉽고 빨라졌어요'
  const buttonLabel =
    계좌개설상태 === 'READY' ? '이어만들기' : '3분만에 개설하기'

  return (
    <ListRow
      contents={
        <Flex direction="column">
          <MyText bold={true} style={{ whiteSpace: 'pre-wrap' }}>
            {title}
          </MyText>
          <Spacing size={8} />
          <Button>{buttonLabel}</Button>
        </Flex>
      }
      right={
        <Image
          src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/money_dollars-1024.png"
          alt={''}
          width={80}
          height={80}
        />
      }
    />
  )
}

export default Account
