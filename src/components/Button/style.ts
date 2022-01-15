import styled from 'styled-components';

interface ButtonProps {
  readonly target: string;
}

export const ButtonStyle = styled.button<ButtonProps>`
  padding: 8px;
  background-color: ${props => props.target === 'true' ? 'orange' : '#f5f5f5'};
  border: 1px;
  border-radius: 3px;
  opacity: 0.9;
  
  :hover {
    opacity: 1; 
  }
`