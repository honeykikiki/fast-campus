import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import { Spacing } from '@shared/Spacing'
import TextFiled from '@shared/TextField'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import validator from 'validator'
import { FormValues } from '@/models/signup'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })
  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }))
  }, [])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name },
    } = e

    setDirty((prev) => ({
      ...prev,
      [name]: 'true',
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const 제출가능한상태인가 = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextFiled
        label="이메일"
        name="email"
        placeholder="이메일을 입력해주세요."
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(errors.email) && Boolean(dirty.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextFiled
        label="패스워드"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(errors.password) && Boolean(dirty.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextFiled
        label="패스워드 재확인"
        name="rePassword"
        type="password"
        placeholder="비밀번호를 재 입력해주세요."
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(errors.rePassword) && Boolean(dirty.rePassword)}
        helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextFiled
        label="이름"
        name="name"
        placeholder="이름을 입력해주세요."
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(errors.name) && Boolean(dirty.name)}
        helpMessage={Boolean(dirty.name) ? errors.name : ''}
        onBlur={handleBlur}
      />

      <FixedBottomButton
        label="회원가입"
        onClick={() => {
          onSubmit(formValues)
        }}
        disabled={제출가능한상태인가 === false}
      />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요.'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8자 이상 입력해주세요.'
  }

  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호를 8글자 이상 입력해주세요'
  } else if (
    validator.equals(formValues.rePassword, formValues.password) === false
  ) {
    errors.rePassword = '비밀번호를 확인해주세요'
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요.'
  }

  return errors
}

export default Form
