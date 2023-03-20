import { useRouter } from 'next/router';
import { ArConnect } from 'permawebjs/auth';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Styled from '../components/onboarding';

const CustomContainer = styled(Styled.ContainerItems)`
  select {
    width: 70%;
    border: none;
    padding: 1rem;
    outline: none;
    border-radius: 10px;
    border: 1px solid #000;
    background: whitesmoke;
    font-weight: 600;
    color: gray;
  }
`;

export default function Onboarding() {
  const router = useRouter();
  const [expense, setExpense] = useState({
    name: '',
    amount: 0,
    category: '',
    date: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    async function getAddress() {
      await ArConnect.getActiveAddress().then(async (address) => {
        setAddress(address);
      });
    }

    getAddress();
  }, []);

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    setExpense({
      ...expense,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setExpense({
      ...expense,
      category: e.currentTarget.value,
    });
  };
  const handleSubmit = async () => {
    setSubmitting(true);

    await fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify({
        address,
        expense,
        function: 'addExpense',
      }),
    }).then(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setExpense({
        ...expense,
        name: '',
        amount: 0,
        category: '',
        date: '',
      });
      setSubmitting(false);
      router.push('/dashboard');
    });
  };

  const disableSubmit =
    !expense.name ||
    expense.category === 'Select Category' ||
    !expense.date ||
    expense.amount <= 0 ||
    !address
      ? true
      : false;

  return (
    <Styled.Main>
      <h2>New Expense 🤑</h2>
      <Styled.Container>
        <CustomContainer>
          <input
            type='text'
            id='name'
            value={expense.name}
            placeholder='Name'
            onChange={handleInput}
          />
          <input
            type='number'
            id='amount'
            value={expense.amount}
            placeholder='Amount'
            onChange={handleInput}
          />
          <select name='category' id='category' onChange={handleSelect}>
            <option value='Select Category' style={{ background: 'orangered' }}>
              Select Category
            </option>
            <option value='Education'>Education</option>
            <option value='Transfer'>Transfer</option>
            <option value='Personal'>Personal</option>
            <option value='Other'>Other</option>
          </select>
          <input
            id='date'
            type='date'
            value={expense.date}
            placeholder='Date 👉 DD-MM-YYYY'
            onChange={handleInput}
          />

          <Styled.OnboardButton onClick={handleSubmit} disabled={disableSubmit}>
            {submitting ? 'submitting...' : 'Create Expense'}
          </Styled.OnboardButton>
        </CustomContainer>
      </Styled.Container>
    </Styled.Main>
  );
}
