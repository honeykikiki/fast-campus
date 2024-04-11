import { ApplyValues } from '@models/apply'
import { css } from '@emotion/react'
import { MouseEvent, useCallback, useState } from 'react'
import Button from '../shared/Button'
import FixedBottomButton from '../shared/FixedBottomButton'
import { Spacing } from '../shared/Spacing'

type CardInfo = Pick<ApplyValues, 'isMaster' | 'isHipass' | 'isRf'>

function CardInfo({ onNext }: { onNext: (cardInfoValues: CardInfo) => void }) {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfo>({
    isMaster: false,
    isHipass: false,
    isRf: false,
  })

  const { isMaster, isHipass, isRf } = cardInfoValues

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const {
      dataset: { value },
      name,
    } = e.target as HTMLButtonElement

    setCardInfoValues((prevValues) => ({
      ...prevValues,
      [name]: JSON.parse(value as string),
    }))
  }, [])

  return (
    <div css={ContainerCardInfoStyles}>
      <Button.Group title="해외결제">
        <Button
          name="isMaster"
          weak={isMaster === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          weak={isMaster === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title="후불교통기능">
        <Button
          name="isRf"
          weak={isRf === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          weak={isRf === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title="후불하이패스카드">
        <Button
          name="isHipass"
          weak={isHipass === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          weak={isHipass === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <FixedBottomButton
        label="완료"
        // disabled={모든정보가_선택되었는가 === false}
        onClick={() => {
          onNext(cardInfoValues)
        }}
      />
    </div>
  )
}

const ContainerCardInfoStyles = css`
  padding: 24px;
`

export default CardInfo
