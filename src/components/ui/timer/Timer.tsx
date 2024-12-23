import { useCallback, useRef } from 'react';
import TimerForm from '@components/ui/timer/TimerForm.tsx';
import RoutineCompleteDialog from '@components/ui/timer/RoutineCompleteDialog.tsx';
import useTokenStore from '@store/useTokenStore.tsx';
import useTimer from '@hooks/useTimer.ts';
import styled from 'styled-components';
import TimerControls from '@components/ui/timer/TimerControls.tsx';
import TimerDisplay from '@components/ui/timer/TimeDiaplay.tsx';
import useEditModeStore from '@store/useEditModeStore.ts';
import { DetailContainer, SummaryContainer } from '@components/style.ts';
import { useDetailSummary } from '@hooks/useDetailSummary.ts';

const TimerContainer = styled(DetailContainer)`
  display: ${({ $display }) => ($display ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  max-width: 55dvw;
  min-width: 150px;
  height: ${({ $isOpen }) => ($isOpen ? 'auto' : '20px')};
`;

export default function Timer() {
  const { isEditMode } = useEditModeStore();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, onToggle] = useDetailSummary();
  const onCompleteRoutine = () => dialogRef.current?.showModal();

  const {
    timeType,
    isPaused,
    remainingTime,
    currentRepeatCount,
    onStartTimer,
    onPauseResume,
    onStop,
    getToken
  } = useTimer(onCompleteRoutine);

  const onCloseModal = () => {
    dialogRef.current?.close();
  };

  return (
    <TimerContainer $display={isEditMode} onToggle={onToggle} $isOpen={isOpen}>
      {timeType === 'NONE' ? (
        <TimerForm onSubmit={onStartTimer} />
      ) : (
        <>
          <TimerDisplay
            timeType={timeType as 'FOCUS' | 'REST'}
            currentRepeatCount={currentRepeatCount}
            remainingTime={remainingTime}
          />
          <TimerControls
            onStop={onStop}
            onPauseResume={onPauseResume}
            isPaused={isPaused}
          />
        </>
      )}
      <SummaryContainer>POMODORO TIMER </SummaryContainer>
      <RoutineCompleteDialog
        num={getToken()}
        onCloseModal={onCloseModal}
        ref={dialogRef}
      />
    </TimerContainer>
  );
}
