import styled from 'styled-components';

interface ButtonProps {
  readonly target: boolean;
}

export const ButtonStyle = styled.button<ButtonProps>`
  padding: 8px;
  background-color: ${props => props.target ? 'orange' : '#f5f5f5'};
  border: 1px;
  border-radius: 3px;
  opacity: 0.9;
  
  :hover {
    opacity: 1; 
  }
`