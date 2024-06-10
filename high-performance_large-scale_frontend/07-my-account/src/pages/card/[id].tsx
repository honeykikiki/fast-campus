import Flex from '@components/shared/Flex'
import ListRow from '@components/shared/ListRows'
import MyText from '@components/shared/Text'
import Top from '@components/shared/Top'
import { Card } from '@models/card'
import { GetServerSidePropsContext } from 'next'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'

import { getCard } from '@/remote/card'
import SEO from '@/components/shared/SEO'

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
  { ssr: false },
)

interface CardDetailPageProps {
  initialCard: Card
}

function CardDetailPage({ initialCard }: CardDetailPageProps) {
  const { id } = useParams()
  const { data } = useQuery(['card', id], () => getCard(id as string), {
    initialData: initialCard,
  })

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data
  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(',')

  return (
    <div>
      <SEO
        title={`${corpName} ${name}`}
        description={subTitle}
        image="https://cdn.pixabay.com/photo/2023/08/22/16/02/chrysanthemum-8206709_1280.jpg"
      />
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />
      <ul>
        {benefit.map((text, index) => (
          <motion.li
            key={text}
            initial={{ opacity: 0, translateX: -90 }}
            transition={{
              duration: 0.7,
              ease: 'easeInOut',
              delay: index * 0.7,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
          >
            <ListRow
              as="div"
              left={
                <Image
                  src="https://cdn4.iconfinder.com/data/icons/travello-basic-ui-1/64/Correct-512.png"
                  width={40}
                  height={40}
                  alt="아이콘"
                />
              }
              contents={
                <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
              }
            />
          </motion.li>
        ))}
      </ul>

      {promotion != null ? (
        <Flex
          direction="column"
          style={{ marginTop: '80px', padding: '0 24px 80px 24px' }}
        >
          <MyText bold={true}>유의사항</MyText>
          <MyText typography="t7">{removeHtmlTags(promotion.terms)}</MyText>
        </Flex>
      ) : null}

      <FixedBottomButton
        label={'1분만에 신청하고 혜택 받기'}
        onClick={() => {}}
      />
    </div>
  )
}

function removeHtmlTags(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  const cardId = query.id as string

  const card = await getCard(cardId)

  return {
    props: {
      initialCard: card,
    },
  }
}

export default CardDetailPage
