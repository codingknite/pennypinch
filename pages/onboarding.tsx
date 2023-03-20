import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { ArConnect } from 'permawebjs/auth';
import { BsArrowRight } from 'react-icons/bs';
import * as Styled from '../components/onboarding';

interface UsersProps {
  data: {
    users: {
      fullName: string;
      userName: string;
      email: string;
      walletAddress: string;
      onboarded: boolean;
    }[];
  };
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/get-all-users');
  const data = await res.json();

  return {
    props: { data },
  };
}

export default function Onboarding(data: UsersProps) {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    userName: '',
    email: '',
  });

  const { users } = data.data;
  const findUserName = users.some(
    (user) => user.userName === userInfo.userName
  );
  const findEmail = users.some((user) => user.email === userInfo.email);

  useEffect(() => {
    const checkInstallation = async () => {
      const walletInstalled = await ArConnect.isInstalled();

      if (walletInstalled) {
        await ArConnect.getActiveAddress()
          .then(async (address) => {
            const findUser = users.find(
              (user) => user.walletAddress === address
            );

            if (!findUser) {
              setWalletAddress(address);
            } else {
              router.push('/dashboard');
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        router.push('/');
      }
    };

    checkInstallation();
  }, []);

  const handleUserInfo = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === 'email') {
      const userEmail = e.currentTarget.value;
      setUserInfo({ ...userInfo, email: userEmail });
      setEmailValid(validateEmail(userEmail));
    } else {
      setUserInfo({ ...userInfo, [e.currentTarget.id]: e.currentTarget.value });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    if (!walletAddress) {
      router.push('/');
    } else {
      await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify({
          user: {
            ...userInfo,
            walletAddress,
            onboarded: true,
            expenses: [],
          },
          function: 'createUser',
        }),
      }).then(async (res) => {
        // wait 3 seconds -> exm eventual consistency
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setUserInfo({ ...userInfo, userName: '', fullName: '', email: '' });
        setSubmitting(false);
        router.push('/dashboard');
      });
    }
  };

  function validateEmail(email) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  const usernameAdded = userInfo.userName ? true : false;
  const validateUserEmail = emailValid && !findEmail;
  const validateUsername = usernameAdded && !findUserName;

  const checkDisable =
    !userInfo.fullName || !validateUsername || !validateUserEmail;

  return (
    <Styled.Main>
      <h2>Let's get to know you ✍️</h2>
      <Styled.Container>
        <Styled.ContainerItems
          validEmail={validateUserEmail}
          validUsername={validateUsername}
        >
          <input
            type='text'
            id='fullName'
            placeholder='Fullname'
            value={userInfo.fullName}
            onChange={handleUserInfo}
          />
          <input
            type='text'
            id='userName'
            placeholder='Username'
            value={userInfo.userName}
            onChange={handleUserInfo}
            className='username-input'
          />
          <input
            type='text'
            id='email'
            placeholder='E-mail Address'
            value={userInfo.email}
            onChange={handleUserInfo}
            className='email-input'
          />

          <Styled.OnboardButton onClick={handleSubmit} disabled={checkDisable}>
            {submitting ? (
              <>Submitting...</>
            ) : (
              <>
                Get Started
                <span>
                  <BsArrowRight />
                </span>
              </>
            )}
          </Styled.OnboardButton>
        </Styled.ContainerItems>
      </Styled.Container>
    </Styled.Main>
  );
}

/***
 *
 * situations
 *
 * 1. user comes to onboarding page but wallet is not installed
 * 2. user comes to onboarding page, wallet is installed but not connected
 */
