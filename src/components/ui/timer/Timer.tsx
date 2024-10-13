import { useCallback, useEffect, useRef } from 'react';
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
  max-width: 45dvw;
  min-width: 100px;
  height: ${({ $isOpen }) => ($isOpen ? 'auto' : '20px')};
`;

export default function Timer() {
  const { isEditMode } = useEditModeStore();
  const { addToken } = useTokenStore();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, onToggle] = useDetailSummary();
  const onCompleteRoutine = useCallback(
    (token: number) => {
      new Notification('타이머 완료!', {
        body: 'Pomodoro 세션이 끝났습니다.',
        icon: '/pwa-64x64.png' // 알림에 표시될 아이콘
      });

      addToken(token);
      dialogRef.current?.showModal();
    },
    [addToken]
  );

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
