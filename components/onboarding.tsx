import styled from 'styled-components';
import { Button } from './sharedstyles';

interface ItemsProps {
  validEmail?: boolean;
  validUsername?: boolean;
}

export const Main = styled.main`
  * {
    margin: 0;
    padding: 0;
  }

  display: flex;
  align-items: center;
  background: #fbfefb;
  flex-direction: column;
  justify-content: center;

  margin: auto;
  width: 100%;
  height: 100vh;

  h2 {
    margin: 2rem 0;
    font-size: 2rem;
  }
`;

export const Container = styled.div`
  background: rgb(4, 5, 6);
  width: 500px;
  height: 500px;
  border-radius: 12px;
`;

export const ContainerItems = styled.div<ItemsProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  height: 100%;

  input {
    outline: none;
    width: 70%;
    padding: 1rem;
    border-radius: 10px;
    background: whitesmoke;
    border: 1px solid #000;

    font-size: 1rem;
    font-weight: 600;

    &::placeholder {
      font-size: 14px;
      font-weight: 600;
    }
  }

  .username-input {
    border: ${(props) =>
      props.validUsername ? '1px solid #000' : '1px solid red'};
  }

  .email-input {
    border: ${(props) =>
      props.validEmail ? '1px solid #000' : '1px solid red'};
  }
`;

export const OnboardButton = styled(Button)`
  color: #000;
  padding: 1rem 2rem;
  background-image: linear-gradient(45deg, #f3ec78, #af4261);

  margin-top: 2rem;

  &:disabled {
    background: gray;
  }
`;
