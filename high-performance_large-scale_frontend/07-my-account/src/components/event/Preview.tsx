import Button from '../shared/Button'
import Flex from '../shared/Flex'
import MyText from '../shared/Text'
import { Event } from '@/models/event'
import { typographyMap } from '@/styles/typography'
import { css } from '@emotion/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import ReactMarkDown from 'react-markdown'

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
  { ssr: false },
)

type ModeType = 'preview' | 'edit'

function Preview({ data, mode = 'preview' }: { data: Event; mode?: ModeType }) {
  const router = useRouter()

  const { title, subTitle, buttonLabel, link, contents } = data

  return (
    <Flex direction="column">
      <Flex style={{ padding: '12px 24px' }} direction="column">
        <MyText bold={true}>{title}</MyText>
        <MyText typography="t6">{subTitle}</MyText>
      </Flex>
      <div>
        <ReactMarkDown css={markDownStyles}>{contents}</ReactMarkDown>
      </div>

      {mode === 'preview' ? (
        <FixedBottomButton
          label={buttonLabel}
          onClick={() => {
            router.push(link)
          }}
        />
      ) : (
        <Button>{buttonLabel}</Button>
      )}
    </Flex>
  )
}

const markDownStyles = css`
  padding: 24px;
  ${typographyMap.t6}

  h1 {
    ${typographyMap.t3}
    font-weight: bold;
    margin: 24px;
  }

  h2 {
    ${typographyMap.t4}
    font-weight: bold;
    margin: 18px;
  }

  ul {
    padding-inline-start: 20px;
    margin: 18px;
  }

  p {
    overflow: scroll;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`

export default Preview
