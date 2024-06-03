import { useState } from 'react'
import dynamic from 'next/dynamic'
import Agreement from '../shared/Agreement'

import { 약관목록 } from '@/constants/accout'
import { Term } from '@/models/account'

const FixedBottomButton = dynamic(() => import('../shared/FixedBottomButton'), {
  ssr: false,
})

function Terms({ onNext }: { onNext: (termIds: string[]) => void }) {
  const [termAgreements, setTermAgreements] = useState(() =>
    generateInitialValues(약관목록),
  )

  const handleAgreement = (id: string, checked: boolean) => {
    setTermAgreements((prevTerms) => {
      return prevTerms.map((term) =>
        term.id === id ? { ...term, checked } : term,
      )
    })
  }
  const handleAllAgreement = (_: any, checked: boolean) => {
    setTermAgreements((prevTerms) => {
      return prevTerms.map((term) => ({
        ...term,
        checked,
      }))
    })
  }

  const allAgreement = termAgreements.every((term) => term.checked === true)
  const 모든필수약관이_동의되었는가 = termAgreements
    .filter((term) => term.mandatory === true)
    .every((term) => term.checked === true)

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={allAgreement} onChange={handleAllAgreement}>
          약관 모두 동의
        </Agreement.Title>
        {termAgreements.map((term) => (
          <Agreement.Description
            key={term.id}
            link={term.link}
            checked={term.checked}
            onChange={(_, checked) => handleAgreement(term.id, checked)}
          >
            {term.mandatory ? '[필수]' : '[선택]'} {term.title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관 동의"
        onClick={() => {
          onNext(
            termAgreements
              .filter((term) => term.checked)
              .map((term) => term.id),
          )
        }}
        disabled={모든필수약관이_동의되었는가 === false}
      />
    </div>
  )
}

function generateInitialValues(terms: Term[]) {
  return terms.map((term) => ({ ...term, checked: false }))
}

export default Terms
