import React from 'react';
import styled from 'styled-components';
import Button from '@components/common/button/Button.tsx';

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

interface TimerControlsProps {
  onStop: () => void;
  onPauseResume: () => void;
  isPaused: boolean;
}

const TimerControls = ({
  onStop,
  onPauseResume,
  isPaused
}: TimerControlsProps) => (
  <ButtonGroup>
    <Button onClick={onStop} buttonColor={'red'}>
      중단
    </Button>
    <Button
      onClick={onPauseResume}
      buttonColor={isPaused ? 'green' : undefined}
    >
      {isPaused ? '재시작' : '일시정지'}
    </Button>
  </ButtonGroup>
);

export default TimerControls;
