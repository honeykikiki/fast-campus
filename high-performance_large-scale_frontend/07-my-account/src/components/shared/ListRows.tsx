import Flex from './Flex'
import Skeleton from './Skeleton'
import Spacing from './Spacing'
import MyText from './Text'
import { css, SerializedStyles } from '@emotion/react'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
  as?: 'div' | 'li'
  style?: SerializedStyles
}

function ListRow({
  as = 'li',
  left,
  contents,
  right,
  withArrow,
  onClick,
  style,
}: ListRowProps) {
  return (
    <Flex
      as={as}
      css={[listRowContainerStyles, style]}
      onClick={onClick}
      align="center"
    >
      {left && <Flex css={listRowLeftStyles}>{left}</Flex>}
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      {right && <Flex>{right}</Flex>}
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  )
}

const listRowContainerStyles = css`
  padding: 24px 24px;
  /* margin-right: 14px; */
`

const listRowLeftStyles = css`
  margin-right: 14px;
`

const listRowContentsStyles = css`
  flex: 1;
`

function ListRowTexts({
  title,
  subTitle,
  spacingSize,
}: {
  title: React.ReactNode
  subTitle: React.ReactNode
  spacingSize?: number
}) {
  return (
    <Flex direction="column">
      <MyText bold={true} style={{ whiteSpace: 'pre-wrap' }}>
        {title}
      </MyText>
      <Spacing size={spacingSize ?? 0} />
      <MyText typography="t7">{subTitle}</MyText>
    </Flex>
  )
}

function ListRowSkeleton() {
  return (
    <Flex as="li" css={listRowContainerStyles} align="center">
      <Flex css={listRowLeftStyles}></Flex>
      <Flex css={listRowContentsStyles}>
        <ListRow.Texts
          title={
            <>
              <Skeleton width={67} height={23} />
              <Spacing size={4} />
            </>
          }
          subTitle={<Skeleton width={85} height={20} />}
        />
      </Flex>
      <Flex></Flex>
    </Flex>
  )
}

function IconArrowRight() {
  return (
    <svg
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
    >
      <title />
      <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
    </svg>
  )
}

ListRow.Texts = ListRowTexts
ListRow.Skeleton = ListRowSkeleton

export default ListRow
