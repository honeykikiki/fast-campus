import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

import Badge from '@/components/shared/Badge'
import Input from '@/components/shared/Input'
import ListRow from '@/components/shared/ListRows'
import MyText from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import useDebounce from '@/hooks/useDebounce'
import { getSearchCards } from '@/remote/card'
import { colors } from '@/styles/colorPlatte'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

function CardSearchPage() {
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword)

  const navigate = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const { data } = useQuery(
    ['cards', debouncedKeyword],
    () => getSearchCards(debouncedKeyword),
    {
      enabled: debouncedKeyword !== '',
    },
  )

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  return (
    <div>
      <Top title="추천카드" subTitle="회원님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input
          ref={inputRef}
          value={keyword}
          onChange={handleKeyword}
          placeholder="찾으시는 카드 이름을 입력해주세요"
        />
      </div>

      {keyword !== '' && data?.length === 0 ? (
        <div style={{ padding: 24 }}>
          <MyText>찾으시는 카드가 없습니다</MyText>
        </div>
      ) : (
        <ul>
          {data?.map((card, index) => (
            <ListRow
              key={card.id}
              onClick={() => {
                navigate.push(`/card/${card.id}`)
              }}
              style={css`
                cursor: pointer;
                &:hover {
                  background-color: ${colors.gray100};
                }
              `}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow={true}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default CardSearchPage
