import styled from 'styled-components';

export const HomeStyle = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  background: #bc4e9c;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f80759, #bc4e9c);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f80759, #bc4e9c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


  button {
    padding: 20px 30px;
    border-radius: 7px;
    text-transform: uppercase;
    background-color: var(--color-second);
    border: 2px solid #f80759;
    font-size: 1.5rem;

    :hover {
      border: 2px solid #bc4e9c;
      background-color: var(--color-third);
    }
  }
`

export const DivStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 47vh;
`