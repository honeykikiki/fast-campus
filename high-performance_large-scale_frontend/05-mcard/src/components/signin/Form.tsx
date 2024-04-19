import Flex from '@shared/Flex'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { Spacing } from '../shared/Spacing'
import TextFiled from '../shared/TextField'
import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'
import { FormValues } from '@/models/signin'
import { colors } from '@styles/colorPlatte'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const error = useMemo(() => validate(formValues), [formValues])
  const 제출가능한가 = Object.keys(error).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextFiled
        label="이메일"
        name="email"
        placeholder="아이디 입력"
        onChange={handleFormValues}
        value={formValues.email}
        // hasError={Boolean(error.email)}
        // helpMessage={error.email}
      />
      <Spacing size={16} />
      <TextFiled
        label="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호 입력"
        onChange={handleFormValues}
        value={formValues.password}
        // hasError={Boolean(error.password)}
        // helpMessage={error.password}
      />
      <Spacing size={30} />
      <Button
        size="medium"
        disabled={제출가능한가 === false}
        onClick={() => {
          onSubmit(formValues)
        }}
      >
        로그인
      </Button>
      <Spacing size={12} />
      <Link to={'/signup'} css={linkStyles}>
        <Text typography="t6">아직 예정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요.'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8자 이상 입력해주세요.'
  }

  return errors
}

export default Form
