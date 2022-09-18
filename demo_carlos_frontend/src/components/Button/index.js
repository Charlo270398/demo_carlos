import styled from 'styled-components'

const ButtonComponent = styled.button`
  background: ${props => props.primary ? "lightgrey" : "palevioletred"};
  border-radius: 3px;
  border: 2px solid grey;
  color: black;
  margin-bottom: 10px;
  padding: 0.25em 2em;
`

export default ButtonComponent 