import { css } from 'styled-components'

const InputStyle = css`
  width: 100%;
  border: 1px solid ${({theme}) => theme.color.gray};
  background: transparent;
  outline: none;
`

export default InputStyle
