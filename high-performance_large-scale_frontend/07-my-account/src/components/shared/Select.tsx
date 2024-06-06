import { forwardRef, SelectHTMLAttributes } from 'react'

import styled from '@emotion/styled'
import { colors } from '@styles/colorPlatte'

import Flex from './Flex'
import MyText from './Text'

export interface Option {
  label: string
  value: string | number | undefined
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  placeholder?: string
  options: Option[]
  hasError?: boolean
  helpMessage?: React.ReactNode
}

const BaseSelect = styled.select`
  height: 42px;
  border: 1px solid ${colors.gray};
  border-radius: 6px;
  padding: 0 14px;

  cursor: pointer;

  &:required:invalid {
    color: #c0c4c7;
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`
const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, value, placeholder, hasError, helpMessage, ...props },
  ref,
) {
  return (
    <Flex direction="column">
      {label ? (
        <MyText
          typography="t7"
          color="black"
          display="inline-block"
          style={{ marginBottom: 6 }}
        >
          {label}
        </MyText>
      ) : null}
      <BaseSelect
        required={true}
        ref={ref}
        value={value}
        {...props}
        aria-invalid={hasError}
      >
        <option disabled={true} hidden={true} value="">
          {placeholder}
        </option>

        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>

      {helpMessage ? (
        <MyText
          typography="t7"
          display="inline-block"
          style={{ marginTop: 6, fontSize: 12 }}
        >
          {helpMessage}
        </MyText>
      ) : null}
    </Flex>
  )
})

export default Select
