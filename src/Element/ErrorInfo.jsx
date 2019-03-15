import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  
  box-sizing: content-box;
  padding: 15px 10px;
  
  border: 3px solid ${({theme}) => theme.errorInfo.border};
  border-radius: 10px;
  background: ${({theme}) => theme.errorInfo.background};
  color: ${({theme}) => theme.errorInfo.color};
`

export const ErrorInfoButton = styled.button`
  background: forestgreen;
  color: wheat;
  
  border-radius: 7px;
  display: inline-block;
  border: none;
  padding: 7px 12px;
`
