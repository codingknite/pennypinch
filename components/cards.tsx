import { FaRandom } from 'react-icons/fa';
import { IoIosPerson } from 'react-icons/io';
import { GrTransaction } from 'react-icons/gr';
import { TbSchool } from 'react-icons/tb';
import styled from 'styled-components';

interface CardProps {
  amount: number;
  tag: 'education' | 'transactions' | 'personal' | 'other';
}

interface HistoryCardProps {
  type: 'spend' | 'transaction';
}

interface ContainerProps {
  type?: 'in' | 'out';
}

interface ExpenseCardProps {
  tag: 'education' | 'transactions' | 'personal' | 'other';
}

export const TransferContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
`;

export const Container = styled.div`
  background: #f8f9fa;
  background: #f8f9fa;
  width: 50%;
  padding: 1rem;
  border-radius: 24px;
`;

export const CardContainer = styled.div<ContainerProps>`
  color: #fff;
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 3px;
  background: #000814;

  display: flex;
  justify-content: space-around;

  .category {
    font-size: 13px;
    color: #000814;
    border-radius: 16px;
    padding: 0.1rem 1rem;
    background: lightgreen;
  }

  div {
    font-size: 13px;
    border-radius: 8px;
    padding: 0.1rem 0.7rem;
    background: ${(props) => (props.type === 'in' ? '#38b000' : '#ba181b')};
  }
`;

export const StyledExpenseCard = styled.div<ExpenseCardProps>`
  margin: 1rem;
  border-radius: 16px;
  background: ${(props) =>
    props.tag === 'education'
      ? '#fefbef'
      : props.tag === 'transactions'
      ? '#dbe7ff'
      : props.tag === 'personal'
      ? '#ffe3f6'
      : '#ffc9bb'};

  padding: 1.2rem;
  width: 18%;

  gap: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  div {
    .amount {
      font-weight: 700;
      font-size: 1.1rem;
    }

    .tag {
      font-size: 12px;
      font-weight: 500;
      margin-top: 0.8rem;
      text-transform: lowercase;
      background: lightgreen;
      width: fit-content;
      padding: 0.2rem 0.8rem;
      border-radius: 16px;
    }
  }
`;

export const ExpenseCard = (props: CardProps) => {
  return (
    <StyledExpenseCard tag={props.tag}>
      {props.tag === 'education' ? (
        <TbSchool size={28} />
      ) : props.tag === 'transactions' ? (
        <GrTransaction size={28} />
      ) : props.tag === 'personal' ? (
        <IoIosPerson size={28} />
      ) : (
        <FaRandom size={28} />
      )}

      <div>
        <p className='amount'>{props.amount}.000 AR</p>
        <p className='tag'>{props.tag}</p>
      </div>
    </StyledExpenseCard>
  );
};
