import Link from 'next/link';
import { ArConnect } from 'permawebjs/auth';
import { getBalance } from 'permawebjs/wallet';
import { TbLogout } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoCopyOutline } from 'react-icons/io5';
import {
  ExpenseCard,
  TransferContainer,
  CardContainer,
} from '../components/cards';
import * as Styled from '../components/dashboard';
import { Container } from '../components/cards';
import { useEffect, useState } from 'react';

interface ExpenseProps {
  name: string;
  amount: number;
  category: string;
  date: string;
}
interface UserProps {
  fullName: string;
  userName: string;
  email: string;
  walletAddress: string;
  onboarded: boolean;
  expenses: ExpenseProps[];
}

interface AllUsersProps {
  data: {
    users: UserProps[];
  };
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/get-all-users');
  const allUsers = await res.json();

  return {
    props: { data: allUsers },
  };
}

export default function Dashboard(data: AllUsersProps) {
  const [walletBalance, setWalletBalance] = useState(0);
  const [currentAddress, setCurrentAddress] = useState('');
  const [allExpenses, setAllExpenses] = useState([]);
  const [user, setUser] = useState({
    fullName: '',
    userName: '',
    email: '',
    walletAddress: '',
    onboarded: true,
  });

  useEffect(() => {
    async function getAddress() {
      const address = await ArConnect.getActiveAddress();
      setCurrentAddress(address);
      const balance = await getBalance({
        address,
        environment: 'mainnet',
      });

      setWalletBalance(Number(balance));

      const { users } = data.data;

      const currentUser: UserProps = users.find(
        (user) => user.walletAddress === address
      );
      setUser({
        ...user,
        fullName: currentUser.fullName,
        userName: currentUser.userName,
        email: currentUser.email,
      });

      const allExpenses = currentUser.expenses;
      setAllExpenses([...allExpenses]);
    }

    getAddress();
  }, []);

  const formatAddress = (add: string) => {
    const strArray = add.split('');
    const formatedStr =
      strArray.splice(0, 6).join('') + '...' + strArray.splice(-6).join('');
    return formatedStr;
  };

  const handleLogout = async () => {
    await ArConnect.disconnect();
  };

  const expenseCards = allExpenses.splice(0, 5);

  return (
    <Styled.Main>
      <Styled.Container>
        <Styled.Sidebar>
          <Styled.Address>
            <div className='address-container'>
              {currentAddress ? (
                <>
                  <p className='your-address'>
                    {formatAddress(currentAddress)}
                  </p>
                  <IoCopyOutline size={16} />
                </>
              ) : (
                <p>loading...</p>
              )}
            </div>
          </Styled.Address>

          <Styled.Logout>
            <Styled.User>
              <div></div>
              <p>{user.fullName}</p>
            </Styled.User>

            <Styled.LogoutButton onClick={handleLogout}>
              <TbLogout size={20} />
              Log Out
            </Styled.LogoutButton>
          </Styled.Logout>
        </Styled.Sidebar>

        <Styled.Dashboard>
          <div className='transfer-ar'>
            <h2>HELLO {user.fullName.split(' ')[0].toUpperCase()}!</h2>
            <Styled.TransferButton disabled={true}>
              Transfer AR
            </Styled.TransferButton>
          </div>

          <Styled.ExpenseInfo>
            <div className='balance-container'>
              <div className='balance'>
                <p>My Balance</p>
                <p className='balance-amount'>{walletBalance}.000 AR</p>
              </div>

              <Link href='/create-tx'>
                <Styled.CreateButton>
                  <span>
                    <AiOutlinePlus />
                  </span>
                  Add New Expense
                </Styled.CreateButton>
              </Link>
            </div>

            <div className='expense-cards'>
              <ExpenseCard amount={0} tag='education' />
              <ExpenseCard amount={0} tag='transactions' />
              <ExpenseCard amount={0} tag='personal' />
              <ExpenseCard amount={0} tag='other' />
            </div>

            <div className='history-cards'>
              <Container>
                <h3>EXPENSE HISTORY</h3>

                {expenseCards.map((card: ExpenseProps, index) => (
                  <CardContainer key={index}>
                    <p>{card.name}</p>
                    <p className='category'>{card.category}</p>
                    <p>{card.date}</p>
                    <p>{card.amount} AR</p>
                  </CardContainer>
                ))}

                <div></div>
              </Container>

              <Container>
                <h3>TRANSFER HISTORY</h3>

                <TransferContainer>
                  <p style={{ color: 'gray' }}>coming soon ⏳</p>
                </TransferContainer>
              </Container>
            </div>
          </Styled.ExpenseInfo>
        </Styled.Dashboard>
      </Styled.Container>
    </Styled.Main>
  );
}
