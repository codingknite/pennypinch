import styled from 'styled-components';
import * as Styled from '../components/onboarding';

const CustomContainer = styled(Styled.ContainerItems)`
  h3 {
    color: #fff;
  }
`;

export default function Onboarding() {
  return (
    <Styled.Main>
      <h2>Transfer AR 💸</h2>
      <Styled.Container>
        <CustomContainer>
          <h3>Your Balance: 0</h3>
          <input type='text' placeholder='Receiver Address' />
          <input type='text' placeholder='Amount Sending' />
          <Styled.OnboardButton>Send AR</Styled.OnboardButton>
        </CustomContainer>
      </Styled.Container>
    </Styled.Main>
  );
}
