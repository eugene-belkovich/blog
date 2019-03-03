import React from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label`
  display: flex;
`;

export default (props) => {
  return (
    <StyledLabel>{props.label || props.children}</StyledLabel>
  )
}
