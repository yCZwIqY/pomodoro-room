import styled from 'styled-components';
import TimerForm from '@components/ui/timer/TimerForm.tsx';
import { useRef, useState } from 'react';
import Button from '@components/common/button/Button.tsx';
import RoutineCompleteDialog from '@components/ui/timer/RoutineCompleteDialog.tsx';
import useTokenStore from '../../../store/tokenStore.tsx';

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

const TimeLabel = styled.div`
  width: 100%;
  text-align: center;
  background-color: ${({ isFocus, theme }) =>
    isFocus ? theme.colors['sub-base'] : '#FBDBFF'};
  color: ${({ isFocus, theme }) =>
    isFocus ? theme.colors['text-accent'] : '#FF7AD8'};
  font-size: 28px;
  padding: 18px 0;
  border-bottom-right-radius: 18px;
  border-bottom-left-radius: 18px;
`;

const RepeatLabel = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSize.md};
  position: relative;
  background-color: ${({ theme }) => theme.colors.base};
  padding: 5px;
  margin: 10px 0;
  border-radius: 18px;
`;
const TimeTypeLabel = styled.div`
  margin-top: 10px;
  background-color: ${({ isFocus }) => (isFocus ? '#3ECEFE' : '#FF7AD8')};
  color: white;
  font-size: ${({ theme }) => theme.fontSize.lg};
  padding: 10px;
  text-align: center;
  border-top-right-radius: 18px;
  border-top-left-radius: 18px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

export interface TimerFormData {
  focusTime: number;
  restTime: number;
  repeatCount: number;
}

type Time = 'NONE' | 'FOCUS' | 'REST';
export default function Timer() {
  const [timeType, setTimeType] = useState<Time>('NONE');
  const [isPause, setIsPause] = useState(false);
  const focusTime = useRef(0);
  const restTime = useRef(0);
  const repeatCount = useRef(0);

  const currentFocusTime = useRef(0);
  const currentRestTime = useRef(0);
  const currentRepeatCount = useRef(0);

  const focusInterval = useRef(0);
  const restInterval = useRef(0);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [remainingTime, setRemainingTime] = useState(0); // State for remaining time

  const { addToken } = useTokenStore();
  const onStartTimer = (data: TimerFormData) => {
    focusTime.current = data.focusTime;
    restTime.current = data.restTime;
    repeatCount.current = data.repeatCount;

    currentFocusTime.current = focusTime.current * 60;
    onStartFocus();
  };
  const onStartFocus = () => {
    setRemainingTime(currentFocusTime.current);
    setTimeType(() => 'FOCUS');
    focusInterval.current = setInterval(() => {
      console.log('focus: ', currentFocusTime.current);
      if (currentFocusTime.current <= 0) {
        clearInterval(focusInterval.current);
        currentRestTime.current = restTime.current * 60;
        onStartRest();
      } else {
        currentFocusTime.current--;
        setRemainingTime(currentFocusTime.current);
      }
    }, 1000);
  };

  const onStartRest = () => {
    setRemainingTime(currentRestTime.current);
    setTimeType(() => 'REST');
    restInterval.current = setInterval(() => {
      console.log('reset: ', currentRestTime.current);
      if (currentRestTime.current <= 0) {
        if (currentRepeatCount.current <= repeatCount.current) {
          onCompleteRoutine();
        } else {
          currentRepeatCount.current++;
          currentFocusTime.current = focusTime.current * 60;
          onStartFocus();
        }
        clearInterval(restInterval.current);
      } else {
        currentRestTime.current--;
        setRemainingTime(currentRestTime.current);
      }
    }, 1000);
  };

  const onCompleteRoutine = () => {
    setTimeType('NONE');
    addToken(getToken());
    dialogRef.current.showModal();
  };

  const getToken = () => {
    return Math.floor(2 + 0.05 * focusTime.current + 2 * repeatCount.current);
  };

  const getMin = () =>
    Math.floor(remainingTime / 60)
      .toString()
      .padStart(2, '0');
  const getSec = () => (remainingTime % 60).toString().padStart(2, '0');

  const onPause = () => {
    clearInterval(focusInterval.current);
    clearInterval(restInterval.current);
    setIsPause(true);
  };

  const onStop = () => {
    clearInterval(focusInterval.current);
    clearInterval(restInterval.current);
    setTimeType('NONE');
  };

  const onRestart = () => {
    setIsPause(false);
    if (timeType === 'FOCUS') {
      onStartFocus();
    } else {
      onStartRest();
    }
  };

  const onCloseModal = () => {
    dialogRef.current.close();
  };

  return (
    <TimerContainer>
      {timeType === 'NONE' ? (
        <TimerForm onSubmit={onStartTimer} />
      ) : (
        <div>
          <RepeatLabel>{currentRepeatCount.current + 1} 번째 반복</RepeatLabel>
          <TimeTypeLabel isFocus={timeType === 'FOCUS'}>
            {timeType === 'FOCUS' ? '집중' : '휴식'}
          </TimeTypeLabel>
          <TimeLabel isFocus={timeType === 'FOCUS'}>
            {getMin()} : {getSec()}
          </TimeLabel>
          <ButtonGroup>
            <Button onClick={onStop} buttonColor={'red'}>
              중단
            </Button>
            {isPause ? (
              <Button onClick={onRestart} buttonColor={'green'}>
                재시작
              </Button>
            ) : (
              <Button onClick={onPause}>일시정지</Button>
            )}
          </ButtonGroup>
        </div>
      )}
      <TimerHeading>POMODORO TIMER</TimerHeading>
      <RoutineCompleteDialog
        num={getToken()}
        onCloseModal={onCloseModal}
        ref={dialogRef}
      />
    </TimerContainer>
  );
}
