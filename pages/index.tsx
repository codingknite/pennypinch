import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/nav';
import * as Styled from '../components/sharedstyles';
import { ImArrowUpRight2 } from 'react-icons/im';
import { useEffect } from 'react';

export default function Home() {
  return (
    <Styled.Container>
      <Head>
        <title>pennypinch🤌</title>
        <meta name='description' content='Expense Tracking Application' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Nav />
      <Styled.Main>
        <div className='text-wrapper'>
          <div>
            <h1>
              Manage your <Styled.GradientOverlay> AR</Styled.GradientOverlay>{' '}
              in the{' '}
              <Styled.GradientOverlay className='break-text'>
                best possible way
              </Styled.GradientOverlay>
            </h1>
          </div>
          <Link href='/onboarding'>
            <Styled.Button>
              Get Started
              <span>
                <ImArrowUpRight2 />
              </span>
            </Styled.Button>
          </Link>
        </div>
        <div className='globe'></div>
      </Styled.Main>
    </Styled.Container>
  );
}
