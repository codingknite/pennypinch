import styled from 'styled-components';

export const Container = styled.div`
  * {
    margin: 0;
    padding: 0;
  }

  display: flex;
  flex-direction: column;
  background: rgb(4, 5, 6);
  background: linear-gradient(
    318deg,
    rgba(4, 5, 6, 1) 44%,
    rgba(29, 30, 44, 1) 83%
  );

  height: 100vh;
`;

export const Main = styled.main`
  background: url('/globe.svg');
  background-position: bottom;
  background-repeat: no-repeat;
  height: 800px;
  width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .text-wrapper {
    height: 65%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;

    h1 {
      color: #fff;
      font-size: 5rem;
      text-align: center;

      .break-text {
        display: block;
      }
    }

    p {
      color: #fff;
    }
  }

  .globe {
    height: 35%;
  }
`;

export const Button = styled.button`
  border: none;
  cursor: pointer;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 15px;

  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  transition: ease-in-out 300ms;

  &:hover {
    background-color: #f3ec78;
    background-image: linear-gradient(45deg, #f3ec78, #af4261);
    transform: scale(1.05);
  }
`;

export const GradientOverlay = styled.span`
  background-color: #f3ec78;
  background-image: linear-gradient(45deg, #f3ec78, #af4261);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;
