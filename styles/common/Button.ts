import styled from 'styled-components';

const Button = styled.button.attrs({
  onKeyUp: (event) => event?.preventDefault(),
  type: 'button'
})`
  background-color: transparent;
  font-family: inherit;
  width: 100%;
`;

export default Button;
