import { useCallback, useRef, useState } from 'react';

export interface TimerFormData {
  focusTime: number;
  restTime: number;
  repeatCount: number;
}

const useTimer = (onCompleteRoutine: (token: number) => void) => {
  // const timeType = useRef<TimeType>('NONE');
  const [timeType, setTimeType] = useState('NONE');
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const focusTime = useRef(0);
  const repeatCount = useRef(0);
  const currentRepeatCount = useRef(0);

  const getToken = useCallback(() => {
    const baseToken = 2;
    const focusTimeBonus = 0.05 * focusTime.current;
    const repeatBonus = 2 * repeatCount.current;
    return Math.floor(baseToken + focusTimeBonus + repeatBonus);
  }, []);

  const onStartTimer = (data: TimerFormData) => {
    if (navigator.serviceWorker.controller) {
      setRemainingTime(data.focusTime * 60);
      navigator.serviceWorker.controller.postMessage({
        type: 'START_TIMER',
        data
      });
    }

    const baseToken = 2;
    const focusTimeBonus = 0.05 * focusTime;
    const repeatBonus = 2 * repeatCount;
    const token = Math.floor(baseToken + focusTimeBonus + repeatBonus);

    navigator.serviceWorker.onmessage = ({ data }) => {
      switch (data.timeType) {
        case 'FOCUS':
          setTimeType('FOCUS');
          break;
        case 'REST':
          setTimeType('REST');
          break;
        case 'INTERVAL':
          setRemainingTime(data.time);
          break;
        case 'COMPLETE':
          onCompleteRoutine(token);
          break;
        default:
          break;
      }
    };
  };

  const onPauseResume = () => {
    setIsPaused(!isPaused);
    navigator.serviceWorker.controller.postMessage({
      type: 'PAUSE_TIMER'
    });
  };

  const onStop = () => {
    setTimeType('NONE');
    setIsPaused(false);
    setRemainingTime(0);
    navigator.serviceWorker.controller.postMessage({
      type: 'STOP_TIMER'
    });
  };

  return {
    timeType,
    isPaused,
    remainingTime,
    currentRepeatCount: currentRepeatCount.current,
    onStartTimer,
    onPauseResume,
    onStop,
    getToken
  };
};

export default useTimer;
