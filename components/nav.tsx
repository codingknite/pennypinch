import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Button } from './sharedstyles';
import { ArConnect } from 'permawebjs/auth';
import { useEffect, useState } from 'react';
import { MdDownloading } from 'react-icons/md';
import { IoLogInOutline } from 'react-icons/io5';
import { BsPatchCheckFill } from 'react-icons/bs';

const Container = styled.nav`
  width: 80%;
  padding: 0.5rem;
  margin: 1rem auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    color: #000404;
    padding: 0.45rem;
    font-weight: 800;
    font-size: 1.5rem;
    border-radius: 12px;
    background: rgb(4, 5, 6);
    background: linear-gradient(
      318deg,
      rgba(4, 5, 6, 1) 44%,
      rgba(29, 30, 44, 1) 83%
    );
    color: #fff;
  }
`;

const ConnectButton = styled(Button)`
  padding: 0.8rem 1.8rem;
`;

export default function Nav() {
  const router = useRouter();
  const [isInstalled, setIsInstalled] = useState(false);
  const [isConnected, setisConnected] = useState(false);

  useEffect(() => {
    const checkInstallation = async () => {
      const walletInstalled = await ArConnect.isInstalled();
      if (walletInstalled) {
        setIsInstalled(true);

        try {
          await ArConnect.getActiveAddress();
          setisConnected(true);
          router.push('/onboarding');
        } catch (error) {
          console.error(error);
        }
      } else {
        setIsInstalled(false);
      }
    };

    checkInstallation();
  }, []);

  async function handleConnect() {
    const walletIsInstalled = await ArConnect.isInstalled();

    if (walletIsInstalled) {
      await ArConnect.connect({
        permissions: [
          'ACCESS_ADDRESS',
          'ACCESS_ALL_ADDRESSES',
          'ACCESS_ARWEAVE_CONFIG',
          'ACCESS_PUBLIC_KEY',
          'DECRYPT',
          'DISPATCH',
          'ENCRYPT',
          'SIGNATURE',
          'SIGN_TRANSACTION',
        ],
        appInfo: {
          name: 'pennypinch',
        },
      });
      router.push('/onboarding');
    } else {
    }
  }

  return (
    <Container>
      <p>pennypinch🤌</p>

      {isConnected ? (
        <ConnectButton onClick={handleConnect}>
          Wallet Connected
          <span>
            <BsPatchCheckFill size={22} />
          </span>
        </ConnectButton>
      ) : isInstalled ? (
        <ConnectButton onClick={handleConnect}>
          Connect Wallet
          <span>
            <IoLogInOutline size={24} />
          </span>
        </ConnectButton>
      ) : (
        <a
          href='https://chrome.google.com/webstore/detail/arconnect/einnioafmpimabjcddiinlhmijaionap'
          target='_blank'
          rel='noreferrer noopener'
        >
          <ConnectButton onClick={handleConnect}>
            Install ArConnect
            <span>
              <MdDownloading size={20} />
            </span>
          </ConnectButton>
        </a>
      )}
    </Container>
  );
}
