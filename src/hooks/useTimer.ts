import { useCallback, useRef, useState, useEffect } from 'react';

export interface TimerFormData {
  focusTime: number;
  restTime: number;
  repeatCount: number;
}

const useTimer = (onCompleteRoutine: (token: number) => void) => {
  const [timeType, setTimeType] = useState('NONE');
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const focusTime = useRef(0);
  const repeatCount = useRef(0);
  const currentRepeatCount = useRef(0);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker('/timer-worker.js');

    workerRef.current.onmessage = ({ data }) => {
      switch (data.type) {
        case 'FOCUS':
          setTimeType('FOCUS');
          break;
        case 'REST':
          setTimeType('REST');
          break;
        case 'INTERVAL':
          setRemainingTime(data.time);
          currentRepeatCount.current = data.repeat;
          break;
        case 'COMPLETE':
          onCompleteRoutine(getToken());
          break;
        default:
          break;
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const getToken = useCallback(() => {
    const baseToken = 2;
    const focusTimeBonus = 0.05 * focusTime.current;
    const repeatBonus = 2 * repeatCount.current;
    return Math.floor(baseToken + focusTimeBonus + repeatBonus);
  }, []);

  const onStartTimer = (data: TimerFormData) => {
    setRemainingTime(data.focusTime * 60);
    focusTime.current = data.focusTime;
    repeatCount.current = data.repeatCount;

    workerRef.current?.postMessage({
      type: 'START_TIMER',
      data
    });

    // 서비스 워커를 통해 알림 표시
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SHOW_NOTIFICATION',
        message: '타이머 진행 중',
        body: '루틴이 진행 중입니다.'
      });
    }
  };

  const onPauseResume = () => {
    setIsPaused(!isPaused);
    workerRef.current?.postMessage({
      type: 'PAUSE_TIMER'
    });
  };

  const onStop = () => {
    setTimeType('NONE');
    setIsPaused(false);
    setRemainingTime(0);
    workerRef.current?.postMessage({
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