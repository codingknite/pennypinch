import styled from 'styled-components';
import { Button } from './sharedstyles';

export const Main = styled.main`
  * {
    margin: 0;
    padding: 0;
  }

  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 15px;

  width: 90%;
  height: 95%;

  display: flex;
`;

export const Sidebar = styled.div`
  background: #0b090a;
  border-radius: 15px;
  color: #fff;

  width: 20%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Logout = styled.div`
  padding: 1rem;

  .user {
    padding: 1rem;
  }
`;

export const LogoutButton = styled(Button)`
  width: 100%;
  padding: 1rem;

  font-size: 1.02rem;

  &:hover {
    transform: scale(1.01);
  }
`;

export const User = styled.div`
  gap: 1rem;
  display: flex;
  align-items: center;
  margin: 1rem 0;

  > div {
    background-image: linear-gradient(45deg, #480ca8, #af4261);
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  p {
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const Address = styled.div`
  height: 30%;
  display: flex;
  border-radius: 15px;
  flex-direction: column;
  justify-content: space-evenly;
  background-image: linear-gradient(45deg, #480ca8, #240046);

  .address-container {
    width: 90%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .your-address {
      &::before {
        content: 'Your Address';
        display: block;
        font-size: 14px;
        margin-bottom: 1rem;
      }
    }

    p {
      font-weight: 500;
      font-size: 1rem;
    }
  }
`;

export const Dashboard = styled.div`
  width: 80%;

  .transfer-ar {
    width: 80%;
    padding: 1rem;
    margin: 1rem auto;

    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-size: 2rem;
      font-weight: 800;
    }
  }
`;

export const TransferButton = styled(Button)`
  padding: 1rem 2rem;

  :disabled {
    background: whitesmoke;
    transform: scale(1);
  }
`;

export const CreateButton = styled(Button)`
  padding: 1rem 2rem;
`;

export const ExpenseInfo = styled.div`
  margin: auto;
  height: 750px;

  .balance-container {
    width: 85%;
    margin: auto;
    padding: 1.2rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .balance {
    background: #000814;
    color: #fff;
    width: 50%;
    padding: 3rem;
    border-radius: 16px;

    > p {
      font-size: 1rem;
      font-weight: 500;
    }

    .balance-amount {
      margin: 1rem 0;
      font-size: 2rem;
      font-weight: 800;
    }
  }

  .expense-cards {
    width: 85%;
    margin: auto;

    display: flex;
    justify-content: space-around;
  }

  .history-cards {
    width: 85%;
    height: 48%;
    margin: auto;
    margin-top: 3rem;

    gap: 1rem;
    display: flex;
  }
`;
