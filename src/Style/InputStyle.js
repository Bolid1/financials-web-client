import { css } from 'styled-components'

const borderSize = 1

const InputStyle = css`
  width: calc(100% - ${borderSize * 2}px);
  border: ${borderSize}px solid ${({theme}) => theme.input.border.color};
  background: transparent;
  outline: none;
  padding: 0;
  margin: 0;
  color: ${(({theme}) => theme.color)};
`

export default InputStyle
