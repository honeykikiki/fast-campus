import { colors } from '@styles/colorPlatte'
import styled from '@emotion/styled'

const Input = styled.input`
  padding: 0 16px;
  font-size: 15px;
  height: 40px;
  font-weight: 500;
  border: 1px solid ${colors.gray};
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.blue};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`

export default Input
