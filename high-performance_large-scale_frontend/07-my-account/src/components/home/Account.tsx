import { act } from 'react'

import useAccount from '@/hooks/useAccount'
import useUser from '@/hooks/useUser'
import addDelimiter from '@/utils/addDelimiter'
import Image from 'next/image'
import Link from 'next/link'

import Button from '../shared/Button'
import Flex from '../shared/Flex'
import ListRow from '../shared/ListRows'
import Spacing from '../shared/Spacing'
import MyText from '../shared/Text'

function Account() {
  const { data: account } = useAccount()
  const user = useUser()

  // 계좌를 보유하지 않은 경우
  if (account == null) {
    return (
      <ListRow
        contents={
          <Flex direction="column">
            <MyText bold={true} style={{ whiteSpace: 'pre-wrap' }}>
              {'계좌 개설이\n더 쉽고 빨라졌어요'}
            </MyText>
            <Spacing size={8} />
            <Link href={'/account/new'}>
              <Button>3분만에 개설하기</Button>
            </Link>
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

  if (account.status === 'READY') {
    return (
      <ListRow
        contents={
          <Flex direction="column">
            <MyText bold={true} style={{ whiteSpace: 'pre-wrap' }}>
              계좌 개설 심사중입니다.
            </MyText>
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

  return (
    <ListRow
      contents={
        <Flex direction="column">
          <MyText typography="t6" color="gray600">
            {user?.name} 회원님의 자산
          </MyText>
          <Spacing size={2} />
          <MyText typography="t3" bold={true}>
            {addDelimiter(account.balance)}원
          </MyText>
        </Flex>
      }
      right={
        <Link href={'/account'}>
          <Button>분석</Button>
        </Link>
      }
    />
  )
}

export default Account
