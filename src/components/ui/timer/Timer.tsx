import {useCallback, useRef} from 'react';
import TimerForm from '@components/ui/timer/TimerForm.tsx';
import RoutineCompleteDialog from '@components/ui/timer/RoutineCompleteDialog.tsx';
import useTokenStore from '@store/useTokenStore.tsx';
import useTimer from "@hooks/useTimer.ts";
import styled from "styled-components";
import TimerControls from "@components/ui/timer/TimerControls.tsx";
import TimerDisplay from "@components/ui/timer/TimeDiaplay.tsx";
import useEditModeStore from "@store/useEditModeStore.ts";

const TimerContainer = styled.details`
    position: absolute;
    right: 10px;
    top: 10px;
    background: white;
    padding: 20px;
    border-radius: 21px;
    box-shadow: 0 4px 1px ${({theme}) => theme.colors.shadow};
    display: ${({display}) => display ? 'none': 'flex'};
    flex-direction: column;
    align-items: center;
    max-width: 45dvw;
    min-width: 170px;

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
    color: ${({theme}) => theme.colors.text};
    font-size: ${({theme}) => theme.fontSize.lg};
    cursor: pointer;
    list-style-type: none;
    position: relative;
    padding-left: 25px;
    overflow: hidden;

    @media ${({theme}) => theme.device.tablet} {
        font-size: ${({theme}) => theme.fontSize.md};
    }
`;

export default function Timer() {
    const {isEditMode} = useEditModeStore();
    const {addToken} = useTokenStore();
    const dialogRef = useRef<HTMLDialogElement>(null);


    const onCompleteRoutine = useCallback((token: number) => {
        addToken(token);
        dialogRef.current?.showModal();
    }, [addToken]);

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
        <TimerContainer display={isEditMode}>
            {timeType === 'NONE' ? (
                <TimerForm onSubmit={onStartTimer}/>
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
            <TimerHeading>POMODORO TIMER</TimerHeading>
            <RoutineCompleteDialog
                num={getToken()}
                onCloseModal={onCloseModal}
                ref={dialogRef}
            />
        </TimerContainer>
    );
}