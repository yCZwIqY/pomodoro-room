import styled from 'styled-components';
import TimeInput from '@components/ui/timer/TimeInput.tsx';
import Button from '@components/common/button/Button.tsx';

export const TimerContainer = styled.details`
  position: absolute;
  right: 10px;
  top: 10px;

  background: white;
  padding: 20px;
  border-radius: 21px;
  box-shadow: 0px 4px 1px ${(props) => props.theme.colors.shadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 40%;
  min-width: 220px;

  summary::before {
    position: absolute;
    content: '';
    width: 20px;
    height: 20px;
    left: 0;
    display: inline-block;
    background: url('/icons/arrow-right-blue.svg') no-repeat center center;
    background-size: contain;
    vertical-align: middle;
    transition: transform 0.1s ease-out;
  }

  &[open] {
    summary::before {
      transform: rotate(90deg);
    }
  }
`;

const TimerHeading = styled.summary`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg};
  cursor: pointer;
  list-style-type: none;
  position: relative;
  padding-left: 25px;
  overflow: hidden;
`;

const StartButtonContainer = styled.div`
  padding: 0 20%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
export default function Timer() {
  return (
    <TimerContainer>
      <TimeInput unit={'분'} label={'집중'} />
      <TimeInput unit={'분'} label={'휴식'} />
      <TimeInput unit={'번'} label={'반복'} />
      <StartButtonContainer>
        <Button fullWidth={true}>시작!</Button>
      </StartButtonContainer>
      <TimerHeading>POMODORO TIMER</TimerHeading>
    </TimerContainer>
  );
}
