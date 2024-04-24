import { colors } from '@styles/colorPlatte'
import styled from '@emotion/styled'
import { forwardRef, SelectHTMLAttributes } from 'react'
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
}

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.gray};
  border: none;
  border-radius: 15px;
  padding: 0 16px;

  cursor: pointer;

  border-right: 16px solid transparent;

  &:required:invalid {
    color: #c0c4c7;
  }
`
const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, value, placeholder, ...props },
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
      <BaseSelect required={true} ref={ref} value={value} {...props}>
        <option disabled={true} hidden={true} value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  )
})

export default Select
