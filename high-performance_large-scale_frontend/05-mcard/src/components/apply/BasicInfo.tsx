import { 연소득옵션, 신용점수옵션, 결제일옵션 } from '@constants/apply'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useState } from 'react'
import FixedBottomButton from '../shared/FixedBottomButton'
import Flex from '../shared/Flex'
import Select from '../shared/Select'
import { ApplyValues } from '@/models/apply'

type infoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

function BasicInfo({ onNext }: { onNext: (infoValues: infoValues) => void }) {
  const [infoValues, setInfoValues] = useState<infoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { name, value },
    } = e

    setInfoValues((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }))
  }, [])

  const 모든정보가_선택되었는가 = Object.values(infoValues).every(
    (value) => value,
  )
  console.log(모든정보가_선택되었는가)

  return (
    <Flex direction="column" css={ContainerBasicInfoStyles}>
      <Select
        name="salary"
        label="연소득"
        options={연소득옵션}
        value={infoValues.salary}
        placeholder={연소득옵션[0].label}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={신용점수옵션}
        value={infoValues.creditScore}
        placeholder={신용점수옵션[0].label}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={결제일옵션}
        value={infoValues.payDate}
        placeholder={결제일옵션[0].label}
        onChange={handleInfoChange}
      />
      <FixedBottomButton
        label="다음"
        disabled={모든정보가_선택되었는가 === false}
        onClick={() => {
          onNext(infoValues)
        }}
      />
    </Flex>
  )
}

const ContainerBasicInfoStyles = css`
  padding: 24px;
`

export default BasicInfo
